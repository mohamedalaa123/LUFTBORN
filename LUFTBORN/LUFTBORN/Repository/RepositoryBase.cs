using LUFTBORN.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace LUFTBORN.Repository
{
    public class RepositoryBase<T> : IRepositoryBase<T> where T : class
    {
        private ApplicationDbContext _ApplicationDbContext;
        public RepositoryBase(ApplicationDbContext _applicationDbContext)
        {
            _ApplicationDbContext = _applicationDbContext;
        }
        public void Create(T entity)
        {
            _ApplicationDbContext.Set<T>().Add(entity);
        }

        public void Delete(T entity)
        {
            _ApplicationDbContext.Set<T>().Remove(entity);
        }

        public IQueryable<T> FindAll()
        {
            return _ApplicationDbContext.Set<T>().AsNoTracking();
        }

        public IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression)
        {
            return _ApplicationDbContext.Set<T>().Where(expression).AsNoTracking();
        }

        public void save()
        {
            _ApplicationDbContext.SaveChanges();
        }

        public void Update(T entity)
        {
            _ApplicationDbContext.Set<T>().Update(entity);
        }
    }
}
