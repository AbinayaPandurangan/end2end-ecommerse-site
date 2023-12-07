using System.ComponentModel.DataAnnotations;
using API.Enitities.OrderAggregate;

namespace API.DTOs
{
    public class OrderDto
    {
       public int Id { get; set; }
        public string BuyerId { get; set; }

        [Required]
        public ShippingAddress ShippingAddress { get; set; }

        public DateTime DateTime { get; set; }
        public List<OrderItemDto> OrderItems { get; set; }
        public long Subtotal { get; set; }
        public long DeliveryFee { get; set; }
        public string  OrderStatus { get; set; } 
        public long OrderTotal {get; set;}
        
    }
}