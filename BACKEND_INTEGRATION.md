# Backend Integration Guide

This guide explains how to connect your React frontend to your Java backend.

## Prerequisites

1. **Java Backend Running**: Ensure your Java backend is running on `http://localhost:8080`
2. **CORS Configuration**: Your backend must allow CORS requests from your frontend
3. **API Endpoints**: Your backend should have the following endpoints

## Required Backend Endpoints

### Products API
```
GET /products
- Returns: Array of products with fields: id, name, description, price, stock

GET /products/{id}
- Returns: Single product details

PUT /products/{id}/stock
- Body: { "stock": number }
- Returns: Updated product
```

### Orders API
```
POST /orders
- Body: { "userId": number, "items": [{ "productId": number, "quantity": number }], "totalPrice": number }
- Returns: Created order with OrderItem details

GET /orders/{id}
- Returns: Order details with items

GET /orders/user/{userId}
- Returns: Array of user orders
```

### Flash Sale API
```
POST /flashsale/buy
- Body: { "userId": number, "products": [{ "productId": number, "quantity": number }] }
- Returns: Purchase result
```

### Users API
```
GET /users/{id}
- Returns: User details (id, username, email)

PUT /users/{id}
- Body: { "username": string, "email": string, "password": string }
- Returns: Updated user

GET /users/{id}/orders
- Returns: Array of user orders
```

## Environment Configuration

Create a `.env.local` file in your project root:

```env
VITE_API_URL=http://localhost:8080/api
```

## CORS Configuration (Backend)

Add CORS configuration to your Java backend:

```java
@CrossOrigin(origins = "http://localhost:5173") // Vite default port
@RestController
public class ProductController {
    // Your endpoints
}
```

Or configure globally:

```java
@Configuration
public class CorsConfig {
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", configuration);
        return source;
    }
}
```

## Data Models

### Product Model (Backend)
```java
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private Double price;
    private Integer stock;
    // getters and setters
}
```

### Order Model (Backend)
```java
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDateTime orderDate;
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> items;
    // getters and setters
}
```

### OrderItem Model (Backend)
```java
@Entity
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;
    
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
    
    private Integer quantity;
    // getters and setters
}
```

### User Model (Backend)
```java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;
    private String email;
    // getters and setters
}
```

## Testing the Integration

1. **Start your Java backend** on port 8080
2. **Start your React frontend** with `npm run dev`
3. **Check browser console** for any CORS or API errors
4. **Test API calls** by adding products to cart and placing orders

## Fallback Behavior

The frontend includes fallback to mock data if the API is unavailable, ensuring the app continues to work during development.

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure your backend allows requests from your frontend origin
2. **404 Errors**: Check that your API endpoints match the expected paths
3. **Connection Refused**: Verify your backend is running on the correct port
4. **Data Format Mismatch**: Ensure your backend returns data in the expected format

### Debug Steps

1. Check browser Network tab for failed requests
2. Verify API endpoints are accessible via Postman/curl
3. Check backend logs for errors
4. Ensure environment variables are set correctly

## Production Deployment

For production, update the `VITE_API_URL` to point to your production backend URL.
