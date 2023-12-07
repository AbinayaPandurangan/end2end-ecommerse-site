
using API.Data;
using API.DTOs;
using API.Enitities;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<User> _userManager;
        private readonly TokenService _tokenService;
        private readonly StoreContext _context;
        public AccountController(UserManager<User> userManager, TokenService tokenService, StoreContext context)
        {
            _context = context;
            _tokenService = tokenService;
            _userManager = userManager;

        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDto)
        {
            var user = await _userManager.FindByNameAsync(loginDto.Username);
            if (user == null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
                return Unauthorized();

                var userBasket = await RetrieveBasket(loginDto.Username);
                var annonBasket = await RetrieveBasket(Request.Cookies["buyerId"]);

                if (annonBasket != null)
                {
                    if (userBasket != null) _context.Baskets.Remove(userBasket);
                    annonBasket.BuyerId = user.UserName;
                    Response.Cookies.Delete("buyerId");
                    await _context.SaveChangesAsync();
                }

                return new UserDTO
                {
                    Email = user.Email,
                    Token = await _tokenService.GenerateToken(user),
                    Basket = annonBasket != null ? annonBasket.MapBasketToDto() : userBasket?.MapBasketToDto()
                };
        }
        [HttpPost("register")]

        public async Task<ActionResult<User>> Register(RegisterDTO registerDto)
        {
            var user = new User { UserName = registerDto.Username, Email = registerDto.Email };

            var result = await _userManager.CreateAsync(user, registerDto.Password);
            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }
                return ValidationProblem();
            }

            await _userManager.AddToRoleAsync(user, "Member");

            return StatusCode(201);
        }

        [Authorize]
        [HttpGet("currentUser")]
        public async Task<ActionResult<UserDTO>> GetCurrentuser()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            var userBasket = await RetrieveBasket(User.Identity.Name);

            return new UserDTO
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user),
                Basket = userBasket?.MapBasketToDto()
            };
        }
           private async Task<Basket> RetrieveBasket(string buyerId)
        {
            if (string.IsNullOrEmpty(buyerId))
            {
                Response.Cookies.Delete("buyerId");
                return null;
            }
            return await _context.Baskets
                        .Include(i => i.Items)
                        .ThenInclude(p => p.Product)
                        .FirstOrDefaultAsync(x => x.BuyerId == buyerId);
        }

        [Authorize]
        [HttpGet("getSavedAddress")]
        public async Task<ActionResult<UserAddress>> GetSavedAddress()
        {
            return await _userManager.Users
            .Where(x => x.UserName == User.Identity.Name)
            .Select(user => user.Address)
            .FirstOrDefaultAsync();

        }
        
    }
}