using Microsoft.AspNetCore.Identity;

namespace API.Enitities
{
    public class User : IdentityUser<int>
    {
        public UserAddress Address {get; set;}
    }
}