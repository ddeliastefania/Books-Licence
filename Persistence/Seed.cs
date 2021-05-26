using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>{
                    new AppUser{DisplayName = "Delia", UserName = "ddeliastefania", Email = "ddeliastefania@yahoo.com"},
                    new AppUser{DisplayName = "Catalin", UserName = "catalinbelu", Email = "catalinbelu@yahoo.com"},
                    new AppUser{DisplayName = "Gabriela", UserName = "Gabriela", Email = "Gabriela@yahoo.com"},
                    new AppUser{DisplayName = "Stefan", UserName = "Stefan", Email = "Stefan@yahoo.com"},
                    new AppUser{DisplayName = "Anca", UserName = "Anca", Email = "Anca@yahoo.com"},
                    new AppUser{DisplayName = "Andreea Diana", UserName = "Andreea Diana", Email = "andreeadiana@yahoo.com"},
                    new AppUser{DisplayName = "Elena", UserName = "Elena", Email = "Elena@yahoo.com"},
                    new AppUser{DisplayName = "Gabriel", UserName = "Gabriel", Email = "Gabriel@yahoo.com"},
                    new AppUser{DisplayName = "HAHA", UserName = "haha", Email = "haha@yahoo.com"},

                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }
            if (context.Books.Any()) return;

            var books = new List<Book>
            {
                new Book
                {
                    Title = " Book 1",
                    Author = "Author 1",
                    Date = DateTime.Now.AddMonths(-2),
                    Category = "kids",
                    Description = "Book 2 months ago",
                    Language ="English"
                },
                new Book
                {
                    Title = " Book 2",
                    Author = "Author 2",
                    Date = DateTime.Now.AddMonths(-1),
                    Category = "culture",
                    Description = "Book 1 month ago",
                    Language ="English"
                },
                new Book
                {
                    Title = " Book 3",
                    Author = "Author 3",
                    Date = DateTime.Now.AddMonths(1),
                    Category = "culture",
                    Description = "Book 1 month in future",
                    Language ="English"
                },
                new Book
                {
                    Title = " Book 4",
                    Author = "Author 4",
                    Date = DateTime.Now.AddMonths(2),
                    Category = "cooking",
                    Description = "Book 2 months in future",
                    Language ="English"
                },
                new Book
                {
                    Title = " Book 5",
                    Author = "Author 5",
                    Date = DateTime.Now.AddMonths(3),
                    Category = "kids",
                    Description = "Book 3 months in future",
                    Language ="English"
                },
                new Book
                {
                    Title = " Book 4",
                    Author = "Author 4",
                    Date = DateTime.Now.AddMonths(4),
                    Category = "kids",
                    Description = "Book 4 months in future",
                    Language ="English"
                },
                new Book
                {
                    Title = " Book 5",
                    Author = "Author 5",
                    Date = DateTime.Now.AddMonths(5),
                    Category = "cooking",
                    Description = "Book 5 months in future",
                    Language ="English"
                },
                new Book
                {
                    Title = " Book 6",
                    Author = "Author 6",
                    Date = DateTime.Now.AddMonths(6),
                    Category = "music",
                    Description = "Book 6 months in future",
                    Language ="English"
                },
                new Book
                {
                    Title = " Book 7",
                    Author = "Author 7",
                    Date = DateTime.Now.AddMonths(7),
                    Category = "travel",
                    Description = "Book 2 months ago",
                    Language ="English"
                },
                new Book
                {
                    Title = " Book 8",
                    Author = "Author 8",
                    Date = DateTime.Now.AddMonths(8),
                    Category = "cooking",
                    Description = "Book 8 months in future",
                    Language ="English"
                }
            };

            await context.Books.AddRangeAsync(books);
            await context.SaveChangesAsync();
        }
    }
}