import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv"
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js"
import companyRoute from "./routes/company.route.js"
import jobRoute from "./routes/job.route.js"
import applicationRoute from "./routes/application.route.js"


dotenv.config({});

const app = express();

app.get("/home", (req,res)=> {
    return res.status(200).json({
        messege:"its coming from backend",
        succes:true
    })
} ) 

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin: (origin, callback) => {
        const allowedOrigins = [
            'http://localhost:5173',
            'https://jobhuntfrontend.onrender.com',
            'https://guest-house-frontend.vercel.app',
            'https://guest-house-frontend-git-main-mohammad-anas-projects-290bb13b.vercel.app',
            'https://job-hunt1.vercel.app'
        ];

        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// app.options('*', cors(corsOptions));  // Optional: Enable preflight requests
const PORT = process.env.PORT || 8000;

app.use("/api/v1/user", userRoute)
app.use("/api/v1/company", companyRoute)
app.use("/api/v1/job", jobRoute)
app.use("/api/v1/application", applicationRoute)

app.listen(PORT, ()=> {
    connectDB();
    console.log(`Server running at port ${PORT}`);
    
} )
