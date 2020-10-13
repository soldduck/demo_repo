using DigitalCatalogueNetCore.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace DigitalCatalogueNetCore.Services
{
    public class LibraryService
    {
        static HttpClient client = new HttpClient();
        private string indexURL = Startup.Configuration["dbapi_host"];
        private static Dictionary<string, string> webDictionary;

        public LibraryService()
        {
            Task<HttpResponseMessage> response = client.GetAsync(indexURL + "/api/Search");
            response.Wait();
            if (response.Result.IsSuccessStatusCode)
            {
                Task<Dictionary<string, string>> asyncWebDict = response.Result.Content.ReadAsAsync<Dictionary<string, string>>();
                asyncWebDict.Wait();
                webDictionary = asyncWebDict.Result;
            }
        }

        public Dictionary<string, string> GetWebDictionary() => webDictionary;

        public async Task<List<BookInfo>> GetClientBooks(string userId, string bookStatus)
        {
            var rfidList = new List<string>();
            var bookInfoList = new List<BookInfo>();
            HttpResponseMessage result = await client.GetAsync(indexURL + "/api/Library?userId=" + userId + "&bookStatus=" + bookStatus);
            if (result.IsSuccessStatusCode)
            {
                rfidList = await result.Content.ReadAsAsync<List<string>>();
            }
            if (rfidList != null)
                foreach (string rfid in rfidList)
                {
                    var book = await GetClientBookInfo(userId, rfid);
                    bookInfoList.Add(book);
                }
            return bookInfoList;
        }

        public async Task<BookInfo> GetClientBookInfo(string userId, string bookRFID)
        {
            var bookInfo = new BookInfo();
            HttpResponseMessage result = await client.GetAsync(indexURL + "/api/Library?userId=" + userId + "&bookRFID=" + bookRFID);
            if (result.IsSuccessStatusCode)
            {
                bookInfo = await result.Content.ReadAsAsync<BookInfo>();
            }
            return bookInfo;
        }

        public async Task<List<BookInfoReg>> GetBookInfoReg(string userId, string bookRFID)
        {
            var bookInfo = new List<BookInfoReg>();
            HttpResponseMessage result = await client.GetAsync(indexURL + "/api/Search?userId=" + userId + "&bookRFID=" + bookRFID);
            if (result.IsSuccessStatusCode)
            {
                bookInfo = await result.Content.ReadAsAsync<List<BookInfoReg>>();
            }
            return bookInfo;
        }

        public async Task<string> GetWebItem(string fond, string docid)
        {
            string item = "";
            HttpResponseMessage result = await client.GetAsync(indexURL + "/api/Search?fond=" + fond + "&docid=" + docid);
            if (result.IsSuccessStatusCode)
            {
                item = await result.Content.ReadAsAsync<string>();
            }
            return item;
        }

        public async Task<Dictionary<string, List<BookInfoReg>>> Search(SearchRequest searchRequest, string userId)
        {

            var searchedDocsInfo = new Dictionary<string, List<BookInfoReg>>();
            var searchedDocs = new List<string>();
            var biblioMaker = new BiblioMaker(searchRequest.fond);


            foreach (SearchParameter parameter in searchRequest.searchParameters)
                if (!string.IsNullOrEmpty(parameter.tab))
                    parameter.tab = webDictionary[parameter.tab];
            searchRequest.Normalize();


            HttpResponseMessage result = await client.PostAsJsonAsync(indexURL + "/api/Search", searchRequest);
            if (result.IsSuccessStatusCode)
                searchedDocs = await result.Content.ReadAsAsync<List<string>>();


            if (searchedDocs.Count != 0)

                foreach (string docId in searchedDocs)
                {
                    string bookDesc = await GetWebItem(searchRequest.fond, docId);
                    biblioMaker.setItem(bookDesc);
                    searchedDocsInfo.Add(biblioMaker.getFullBiblio(), string.IsNullOrEmpty(userId) ? null : await GetBookInfoReg(userId, docId));
                }

            return searchedDocsInfo;
        }

        public async Task<ResponseModel> PreOrder(OrderModel preorder)
        {
            ResponseModel orderStatus = new ResponseModel();
            HttpResponseMessage result = await client.PostAsJsonAsync(indexURL + "/api/Order/PreOrder", preorder);
            if (result.IsSuccessStatusCode)
                orderStatus = await result.Content.ReadAsAsync<ResponseModel>();
            return orderStatus;
        }

        public async Task<ResponseModel> RemovePreOrder(OrderModel preorder)
        {
            ResponseModel orderStatus = new ResponseModel();
            HttpResponseMessage result = await client.PostAsJsonAsync(indexURL + "/api/Order/RemovePreOrder", preorder);
            if (result.IsSuccessStatusCode)
                orderStatus = await result.Content.ReadAsAsync<ResponseModel>();
            return orderStatus;
        }

        public async Task<ResponseModel> Order(OrderModel order)
        {
            ResponseModel orderStatus = new ResponseModel();
            HttpResponseMessage result = await client.PostAsJsonAsync(indexURL + "/api/Order/Order", order);
            if (result.IsSuccessStatusCode)
                orderStatus = await result.Content.ReadAsAsync<ResponseModel>();
            return orderStatus;
        }
    }
}
