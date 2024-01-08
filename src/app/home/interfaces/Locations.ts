import { LngLat } from "mapbox-gl"

export interface LocationArray {

	agente: string,
	cliente: string,
	description: string,
	lngLat: LngLat,
	provincia: string,
	title: string,
}

export interface Places {
	provincia: string,
	title: string,
	lngLat: number[],
	description: string,
}

export interface LocationList {

	title: string,
	lngLat: LngLat,
	provincia: string,
	description: string,
	agente: string,
}


