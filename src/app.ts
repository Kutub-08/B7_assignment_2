import express from "express"
import { authRouter } from "./modules/auth/auth.router";
import { issueRouter } from "./modules/issues/issues.router";
import globalError from "./middleware/globalErrorHandle";
import cors from "cors"
const app = express()

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded());
app.use(cors())

app.get('/', (req, res) => {
  res.json({
    Project : "Bug DevPulse",
  })
})

app.use("/api/auth",authRouter)
app.use('/api/issues',issueRouter)


app.use(globalError);

export default app;