using System;
using System.Collections.Generic;

namespace Domain
{
    public class Book
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public DateTime Date { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
        public string Language { get; set; }
        public bool IsCancelled { get; set; }

        public ICollection<BookAttendee> Attendees { get; set; } = new List<BookAttendee>();
        public ICollection<Comment> Comments { get; set; } = new List<Comment>();
    }
}