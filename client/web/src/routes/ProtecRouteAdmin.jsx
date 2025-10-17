import React, { useEffect, useState } from 'react'
import useEcomeStore from '../store/Ecome_store'
import { currentAdmint } from '../api/auth'
import LoadingToredirect from './LoadingToredirect'
const ProtectRouteAdmin = ({ element }) => {
  const [ok, setOk] = useState(false)
  const user = useEcomeStore((state) => state.user)
  const token = useEcomeStore((state) => state.token)
  // console.log(token)
  useEffect(() => {
    if (user && token) {
      // send to back
      currentAdmint(token)
      .then((res) => setOk(true)
      ).catch((err)=>setOk(false))
    }
  }, [])
  return ok ? element : <LoadingToredirect/>
}

export default ProtectRouteAdmin