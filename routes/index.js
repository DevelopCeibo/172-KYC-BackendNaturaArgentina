import express from "express"
const router = express.Router()

import BCrouter from "./belleza-consciente.js"
import CRrouter from "./conexiones-reales.js"
import EDCroutes from "./expresion-de-color.js"
//
import CRVRrouter from "./vr-conex-reales.js"
import BC_VRrouter from "./vr-belleza-consciente.js"
import EDCRrouter from "./vr-expresion-de-color.js"
import TYroutes from "./gracias.js"



router.use("/conexiones-reales-vr", CRVRrouter)
router.use("/belleza-consciente-vr", BC_VRrouter)
router.use("/expresion-de-color-vr", EDCRrouter)

router.use("/belleza-consciente", BCrouter)
router.use("/conexiones-reales", CRrouter)
router.use("/expresion-de-color", EDCroutes)

router.use("/gracias", TYroutes)


export default router
