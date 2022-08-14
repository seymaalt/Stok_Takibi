using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using WebApi.Models;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        //configuration
        public readonly IConfiguration Configuration;

        public CategoryController(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select CategoryId,CategoryName from dbo.Category";

            DataTable dt = new DataTable();

            string sqlsource = Configuration.GetConnectionString("productappcon");

            SqlDataReader sqlreader;

            using (SqlConnection sqlconn = new SqlConnection(sqlsource))
            {
                sqlconn.Open();
                using (SqlCommand cmd = new SqlCommand(query, sqlconn))
                {
                    sqlreader = cmd.ExecuteReader();
                    dt.Load(sqlreader); ;

                    sqlreader.Close();
                    sqlconn.Close();
                }
            }
            return new JsonResult(dt);
        }

        [HttpPost]
        public JsonResult Post(Category category)
        {
            string query = @"
                    insert into dbo.Category values 
                    ('"+category.CategoryName+@"')
                    ";

            DataTable dt = new DataTable();

            string sqlsource = Configuration.GetConnectionString("productappcon");

            SqlDataReader sqlreader;

            using (SqlConnection sqlconn = new SqlConnection(sqlsource))
            {
                sqlconn.Open();
                using (SqlCommand cmd = new SqlCommand(query, sqlconn))
                {
                    sqlreader = cmd.ExecuteReader();
                    dt.Load(sqlreader); ;

                    sqlreader.Close();
                    sqlconn.Close();
                }
            }
            return new JsonResult("bşarılıııı");
        }


        [HttpPut]
        public JsonResult put(Category category)
        {
            string query = @"
                    update dbo.Category set 
                    CategoryName = '" + category.CategoryName + @"'
                    where CategoryId = " + category.CategoryId + @" 
                    ";

            DataTable dt = new DataTable();

            string sqlsource = Configuration.GetConnectionString("productappcon");

            SqlDataReader sqlreader;

            using (SqlConnection sqlconn = new SqlConnection(sqlsource))
            {
                sqlconn.Open();
                using (SqlCommand cmd = new SqlCommand(query, sqlconn))
                {
                    sqlreader = cmd.ExecuteReader();
                    dt.Load(sqlreader);

                    sqlreader.Close();
                    sqlconn.Close();
                }
            }
            return new JsonResult(" güncelleme başarılı");
        }



        [HttpDelete("{id}")]
        public JsonResult delete(int id)
        {
            string query = @"
                    delete from dbo.Category
                    where CategoryId = " + id + @" 
                    ";

            DataTable dt = new DataTable();

            string sqlsource = Configuration.GetConnectionString("productappcon");

            SqlDataReader sqlreader;

            using (SqlConnection sqlconn = new SqlConnection(sqlsource))
            {
                sqlconn.Open();
                using (SqlCommand cmd = new SqlCommand(query, sqlconn))
                {
                    sqlreader = cmd.ExecuteReader();
                    dt.Load(sqlreader);

                    sqlreader.Close();
                    sqlconn.Close();
                }
            }
            return new JsonResult(" silme başarılı");
        }

    }
}
