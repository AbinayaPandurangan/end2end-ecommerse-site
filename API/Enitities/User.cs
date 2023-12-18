using Microsoft.AspNetCore.Identity;

namespace API.Enitities
{
    public class User : IdentityUser<int>
    {
        public int UserId { get; set; }
        public UserAddress Address {get; set;}
    }
}