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
	_id?: string,
	provincia: string,
	title: string,
	lngLat: number[],
	description: string,
}

export interface LocationList {
	_id?: string,
	title: string,
	lngLat: number[],
	provincia: string,
	description: string,
	agente: string,
	__version?: string
}


