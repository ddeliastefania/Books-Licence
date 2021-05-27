using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Book> Books { get; set; }
        public DbSet<BookAttendee> BookAttendees { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<BookAttendee>(x => x.HasKey(aa => new { aa.AppUserId, aa.BookId }));

            builder.Entity<BookAttendee>()
            .HasOne(u => u.AppUser)
            .WithMany(a => a.Books)
            .HasForeignKey(aa => aa.AppUserId);

            builder.Entity<BookAttendee>()
            .HasOne(u => u.Book)
            .WithMany(a => a.Attendees)
            .HasForeignKey(aa => aa.BookId);
        }
    }
}