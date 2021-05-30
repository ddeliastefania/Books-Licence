using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Books
{
    public class Details
    {
        public class Query : IRequest<Result<BookDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<BookDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _mapper = mapper;
                _context = context;
            }
            public async Task<Result<BookDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var book = await _context.Books
                .ProjectTo<BookDto>(_mapper.ConfigurationProvider, new { currentName = _userAccessor.GetUsername() })
                .FirstOrDefaultAsync(x => x.Id == request.Id);

                return Result<BookDto>.Success(book);
            }
        }
    }
}