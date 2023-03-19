export default interface MovieResults {
	title: string;
	name?:string;
	id: number;
	backdrop_path: string;
	poster_path: string;
	adult: boolean;
	genre_ids: number[];
	video: boolean;
	videos?: {
		results: []
	};
	runtime?: number;
	vote_average: number;
	vote_count: number;
	popularity: number;
	release_date: string;
	overview: string;
	first_air_date?: string;
	original_title?: string;
	original_language?: string;
}