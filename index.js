const express = require("express");

const app = express();
const cors = require("cors");

//middleware
app.use(cors());
app.use(express.json());
const PORT = 3000;

//Creating a rooms and customer details
const rooms=[
    {
        roomId: "01",
        roomName: "Room_100",
        amenities: "Room service,AC",      
        seats: 50,
        pricePreHr: 500,
        bookedStatus: false,
        customerDetails: {
          customerName: "",
          date: "",
          startTime: "",
          endTime: "",
        },
      },
      {
        roomId: "02",
        roomName: "Room_102",
        amenities: "Room service,HighClass-GOLD Room ,AC",      
        seats: 10,
        pricePreHr: 1000,
        bookedStatus: true,
        customerDetails: {
          customerName: "saveen",
          date: "01/02/2024",
          startTime: 1100,
          endTime: 1300,
          },
      },
      {
        roomId: "03",
        roomName: "Room_103",
        amenities: "HighClass-GOLD Room ,  AC",      
        seats: 10,
        pricePreHr: 700,
        bookedStatus: true,
        customerDetails: {
        customerName: "sibi",
        date: "01/12/2024",
        startTime: 1100,
        endTime: 1300,
          },
      },
      {
        roomId: "04",
        roomName: "Room_104",
        amenities: "Room service,AC",      
        seats: 50,
        pricePreHr: 500,
        bookedStatus: false,
        customerDetails: {
          customerName: "",
          date: "",
          startTime: "",
          endTime: "",
        },
      },
    

]
//home page
app.get('/',(request,response)=>{

    response.send("<h1 style=text-align:center>Ticket Booking API</h1>")
})

//Creating a room
app.post("/rooms/create", (request, response) => {

    const newRoom = request.body;
    rooms.push(newRoom);
    response.send(newRoom);
})

// Booking a room
app.post("/rooms/booking", (request, response) => {
    const booking = request.body;
  
      rooms.map((room) => {
          if (room.roomID == booking.roomID) {
           console.log(room);
              if (room.customerDetails.date != booking.date) {
                room.customerDetails.pricePreHr=booking.pricePreHr;
                  room.customerDetails.customerName = booking.customerName;
                  room.customerDetails.date = booking.date;
                  room.customerDetails.startTime = booking.startTime;
                  room.customerDetails.endTime = booking.endTime;
                  room.bookedStatus = !room.bookedStatus;
                  response.send("Room booked successfully")
              } else {
                  response.send("Room already booked for this date. Please choose another room")
              }
          }
          return room;
      })
  
  })

  //List all rooms with booked 
  app.get("/rooms", (request, response) => {
    response.send(
      rooms.map((room) => {
        if (room.bookedStatus == true) {
          return {
            "Room name": room.roomName,
            "Booked Status": "Booked",
            "Customer Name": room.customerDetails.customerName,
            "Date": room.customerDetails.date,
            "Start Time": room.customerDetails.startTime,
            "End Time": room.customerDetails.endTime,
          };
        } else {
          return { "Room name": room.roomName, "Booked Status": "Vacant" };
        }
      })
    );
  });
  
  //List all customers with booked data
  app.get("/customers", (request, response) => {
    response.send(
      rooms
        .filter((room) => {
          if (room.bookedStatus === true) {
            return room;
          }
        })
        .map((room) => {
          return {
            "Customer name": room.customerDetails.customerName,
            "Room name": room.roomName,
            Date: room.customerDetails.date,
            "Start Time": room.customerDetails.startTime,
            "End Time": room.customerDetails.endTime,
          };
        })
    );
  });

app.listen(PORT, () => console.log("server has started at:", PORT));