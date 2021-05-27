using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Books
{
    public class List
    {
        public class Query : IRequest<Result<List<BookDto>>> { }
        public class Handler : IRequestHandler<Query, Result<List<BookDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }
            public async Task<Result<List<BookDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var books = await _context.Books
                .ProjectTo<BookDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

                return Result<List<BookDto>>.Success(books);
            }
        }
    }
}