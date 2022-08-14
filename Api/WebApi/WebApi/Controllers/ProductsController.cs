using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using WebApi.Models;
using Microsoft.AspNetCore.Hosting;
using System.IO;
namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        //configuration
        public readonly IConfiguration Configuration;
        private readonly IWebHostEnvironment _env;

        public ProductsController(IConfiguration configuration, IWebHostEnvironment env)
        {
            Configuration = configuration;
            _env = env;
        }

        [HttpGet]
        public JsonResult get()
        {
            string query = @"select ProductId,ProductName,Category,convert(varchar(10),dateOfJoining,120) as dateOfJoining from dbo.product";

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
            return new JsonResult(dt);
        }

        [HttpPost]
        public JsonResult post(Products products)
        {
            string query = @"
                    insert into dbo.product
                    (ProductName,Category,dateOfJoining)
                    values 
                    (
                    '" + products.ProductName + @"'
                    ,'" + products.Category + @"'
                    ,'" + products.dateOfJoining + @"'
                    )
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
            return new JsonResult(" ekleme başarılı");
        }


        [HttpPut]
        public JsonResult put(Products products)
        {
            string query = @"
                    update dbo.product set 
                    ProductName = '" + products.ProductName + @"'
                    ,Category = '" + products.Category + @"'
                    ,dateOfJoining = '" + products.dateOfJoining + @"'
                    where ProductId = " + products.ProductId + @" 
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
                    delete from dbo.product
                    where ProductId = " + id + @" 
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

       


        [Route("GetAllCategoryNames")]
        public JsonResult GetAllCategoryNames()
        {
            string query = @"
                    select CategoryName from dbo.Category
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = Configuration.GetConnectionString("productappcon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

    }
}
