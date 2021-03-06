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
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<UserFollowing> UserFollowing { get; set; }

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

            builder.Entity<Comment>()
            .HasOne(a => a.Book)
            .WithMany(c => c.Comments)
            .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<UserFollowing>(b =>
            {
                b.HasKey(k => new { k.ObserverId, k.TargetId });

                b.HasOne(o => o.Observer)
                .WithMany(f => f.Followings)
                .HasForeignKey(o => o.ObserverId)
                .OnDelete(DeleteBehavior.Cascade);

                b.HasOne(o => o.Target)
                .WithMany(f => f.Followers)
                .HasForeignKey(o => o.TargetId)
                .OnDelete(DeleteBehavior.Cascade);

            });
        }
    }
}