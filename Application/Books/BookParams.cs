using System;
using Application.Core;

namespace Application.Books
{
    public class BookParams : PagingParams
    {
        public bool IsGoing { get; set; }
        public bool IsHost { get; set; }
        public DateTime StartDate { get; set; } = DateTime.UtcNow;
        public string Author { get; set; }
        public string Category { get; set; }
    }
}