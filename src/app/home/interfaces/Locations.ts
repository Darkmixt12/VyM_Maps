import { LngLat } from "mapbox-gl"

export interface LocationArray {

	agente: string,
	cliente: string
	description: string,
	lngLat: LngLat
	provincia: string,
	title: string,
}

export interface Places {
	provincia: string,
	title: string,
	lngLat: number[],
}