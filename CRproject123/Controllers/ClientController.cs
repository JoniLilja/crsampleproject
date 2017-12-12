using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using CRproject123.Models;

namespace CRproject123.Controllers
{
    [Produces("application/json")]
    [Route("api/Client")]
    public class ClientController : Controller
    {
        List<Client> client = new List<Client>  // Sample object data for testing.
        {
            new Client { Id = 1, Name = "testN1", Email="testE1"  },
            new Client { Id = 2, Name = "testN2", Email="testE2"  },
            new Client { Id = 3, Name = "testN3", Email="testE3"  },
            new Client { Id = 4, Name = "testN4", Email="testE4"  }

        };


        [Route("/GetAll")]
        public IEnumerable<Client> GetAll()   // Read and return the json data from json file
        {
            var filepath = @"./data.json";
            var jsondata = System.IO.File.ReadAllText(filepath);
            var result = JsonConvert.DeserializeObject<IEnumerable<Client>>(jsondata);

            return result;
        }

        [Route("/GetAllnn")]
        public IEnumerable<Client> GetAllnn()   // gives the client object data, isn't special, here for testing purposes
        {
            return client;
        }

        [Route("/AddClient")]
        public IEnumerable<Client> AddClient()
        {
            var filepath = @"./data.json";
            var jsondata = System.IO.File.ReadAllText(filepath);        // get the data fromn data.json

            var clientlist = JsonConvert.DeserializeObject<List<Client>>(jsondata); // make list out of the data

            clientlist.Add(new Client()                                              // add stuff to list
            { Id = 4, Email = "testest", Name = "nametest" });

            jsondata = JsonConvert.SerializeObject(clientlist);           // write the list back to json
            System.IO.File.WriteAllText(filepath, jsondata);

            return clientlist;
        }

        [Route("/GetClient/{id}")]
        public IEnumerable<Client> GetClient(int id)
        {
            var filepath = @"./data.json";
            var jsondata = System.IO.File.ReadAllText(filepath);    // get the data fromn data.json

            var clientlist = JsonConvert.DeserializeObject<List<Client>>(jsondata); // list out of the data


            var result = clientlist.Where(x => x.Id == id);

            return result;
        }


        [Route("/DelClient/{id}")]
        public IEnumerable<Client> DelClient(int id)
        {
            var filepath = @"./data.json";
            var jsondata = System.IO.File.ReadAllText(filepath);    // get the data fromn data.json

            var clientlist = JsonConvert.DeserializeObject<List<Client>>(jsondata); // list out of the data


            clientlist.RemoveAll(x => x.Id == id);

            
            jsondata = JsonConvert.SerializeObject(clientlist);         // write the list back to json
            System.IO.File.WriteAllText(filepath, jsondata);

            return clientlist;
        }





        [Route("/testink/")]
        public IEnumerable<Client> Testink()
        {
            return null;
        }
    }
}