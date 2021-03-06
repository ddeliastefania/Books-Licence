using System.Linq;
using Application.Books;
using Application.Comments;
using Application.Profiles;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : AutoMapper.Profile
    {
        public MappingProfiles()
        {
            string currentUsername = null;
            CreateMap<Book, Book>();
            CreateMap<Book, BookDto>()
                .ForMember(d => d.HostUsername, o => o.MapFrom(s => s.Attendees
                .FirstOrDefault(x => x.IsHost).AppUser.UserName));
            CreateMap<BookAttendee, AttendeeDto>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(d => d.FollowersCount, o => o.MapFrom(s => s.AppUser.Followers.Count))
                .ForMember(d => d.FollowingCount, o => o.MapFrom(s => s.AppUser.Followings.Count))
                .ForMember(d => d.Following, o => o.MapFrom(s => s.AppUser.Followers.Any(x => x.Observer.UserName == currentUsername))); ;
            CreateMap<AppUser, Profiles.Profile>()
                .ForMember(d => d.Image, o => o.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(d => d.FollowersCount, o => o.MapFrom(s => s.Followers.Count))
                .ForMember(d => d.FollowingCount, o => o.MapFrom(s => s.Followings.Count))
                .ForMember(d => d.Following, o => o.MapFrom(s => s.Followers.Any(x => x.Observer.UserName == currentUsername)));
            CreateMap<Comment, CommentDto>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.CommentAuthor.DisplayName))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.CommentAuthor.UserName))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.CommentAuthor.Photos.FirstOrDefault(x => x.IsMain).Url));
            CreateMap<BookAttendee, UserBookDto>()
                .ForMember(d => d.Id, o => o.MapFrom(s => s.Book.Id))
                .ForMember(d => d.Date, o => o.MapFrom(s => s.Book.Date))
                .ForMember(d => d.Title, o => o.MapFrom(s => s.Book.Title))
                .ForMember(d => d.Category, o => o.MapFrom(s =>s.Book.Category))
                .ForMember(d => d.HostUsername, o => o.MapFrom(s =>s.Book.Attendees.FirstOrDefault(x =>x.IsHost).AppUser.UserName));
        }
    }
}