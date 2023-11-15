using API.Data;
using Microsoft.AspNetCore.Mvc;
using API.Enitities;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]

public class ProductController : ControllerBase
{
    private readonly StoreContext _context;
    public ProductController(StoreContext context)
    {
        _context = context;

    }

    [HttpGet]
    public async Task<ActionResult<List<Product>>> GetProducts()
    {

        return await _context.Products.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProduct(int id)
    {

        return await _context.Products.FindAsync(id);
    }
}