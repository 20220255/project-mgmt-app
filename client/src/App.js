import Header from "./components/Header";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Project from "./pages/Project";
import Test from "./pages/Test";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

let client;

// if (process.env.NODE_ENV === "production") {
  client = new ApolloClient({
    uri: "https://project-mgmt-app-ajiz.onrender.com/graphql",
    cache,
  });  
// } else {
  // client = new ApolloClient({
  //   uri: "http://localhost:5000/graphql",
  //   cache,
  // });
  // client = new ApolloClient({
  //   uri: "project-mgmt-app-production.up.railway.app/",
  //   cache,
  // });
// }



function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Header />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects/:id" element={<Project />} />
              <Route path="/test" element={<Test />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
