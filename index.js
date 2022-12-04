const { 
    ApolloServer,
    gql,
    MockList
} = require("apollo-server");

const typeDefs = gql`
    scalar Date
    """
     Documentation for the Graphql basics
    """

    type ProgrammingDay {
         "Programming Day Unique Identifier"
        id: ID!
         "Date of schema"
        date: Date!
         "Day of Programming Language"
        programming: String!
          "Satisfied or Not"
        conditions: Conditions!
    }
    enum Conditions {
        SATISFIED
        NOT_SATISFIED
    }
    type Query  {
        totalDays : Int!
        allDays : [ProgrammingDay!]!
    }

    input AddDayInput {
        date: Date!
        programming: String!
        conditions : Conditions
    }

    type RemoveDayPayload {
        day : ProgrammingDay!
        remove : Boolean!
        totalDaysBeforeRemove : Int!
        totalDaysAfterRemove : Int!
    }

    type Mutation {
        addDay(input : AddDayInput) : ProgrammingDay!
        removeDay (id: ID!) : RemoveDayPayload!
    }

    type Subscription {
        newDay : ProgrammingDay!
    }
    `;
const mocks = {
    Date : ()  => "1/2/2025" ,
    String : ()  => "testing string",
    Query : () => ({
        allDays : () => new MockList(8) 
    })
};

const server = new ApolloServer({
    typeDefs,
    mocks
})

server
    .listen()
    .then(({ url }) => console.log(`server is runnig on ${url}`))