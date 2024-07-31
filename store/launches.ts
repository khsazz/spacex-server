import { defineStore } from 'pinia';
import axios from 'axios';
import { toast, ToastOptions } from 'vue3-toastify';

interface Launch {
	_id?: string;
	flight_number: number;
	name: string;
	date_utc: string;
}
const notify = (text: string) => {
	toast(text, {
		theme: 'auto',
		type: 'default',
		position: 'bottom-right',
		autoClose: 1000,
		transition: 'slide'
	} as ToastOptions);
};

export const useLaunchesStore = defineStore('launches-store', {
	state: () => {
		return {
			launches: [] as Launch[],
			savedLaunches: [] as Launch[]
		};
	},
	actions: {
		async fetchLaunches() {
			const response = await axios.post(
				'https://api.spacexdata.com/v5/launches/query',
				{
					options: {
						sort: { date_utc: 'desc' },
						limit: 30,
						select: ['flight_number', 'name', 'date_utc']
					}
				}
			);
			this.launches = await response.data.docs;
		},
		async fetchSavedLaunches() {
			const response = await axios.get(
				'http://localhost:5000/api/launches'
			);
			this.savedLaunches = response.data;
		},
		async saveLaunch(launch: Launch) {
			try {
				await axios.post('http://localhost:5000/api/launches', launch);
				notify('Saved');
				this.savedLaunches.push(launch);
			} catch (error) {
				if (
					error.response.data.message
						.toLowerCase()
						.includes('duplicate')
				) {
					notify('Duplicate Entry');
				}
			}
		},
		async deleteLaunch(id: string) {
			await axios.delete(`http://localhost:5000/api/launches/${id}`);
			notify('Deleted');
			this.savedLaunches = this.savedLaunches.filter(
				(launch) => launch._id !== id
			);
		}
	}
});
