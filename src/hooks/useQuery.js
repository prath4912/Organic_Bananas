// import React from 'react'
import { useLocation } from 'react-router-dom/cjs/react-router-dom'


export default function useQuery() {
    return new URLSearchParams(useLocation().search) ;

}
