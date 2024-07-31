import { setActivePinia, createPinia } from 'pinia';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { toast } from 'vue3-toastify';
import { useLaunchesStore } from '../store/launches';

jest.mock('vue3-toastify', () => ({
	toast: jest.fn()
}));

describe('Launches Store', () => {
	let store: ReturnType<typeof useLaunchesStore>;
	let mock: MockAdapter;

	beforeEach(() => {
		setActivePinia(createPinia());
		store = useLaunchesStore();
		mock = new MockAdapter(axios);
	});

	afterEach(() => {
		mock.reset();
	});

	it('fetches launches', async () => {
		const launches = [
			{
				flight_number: 1,
				name: 'Falcon 1',
				date_utc: '2022-12-01T00:00:00Z'
			}
		];

		mock.onPost('https://api.spacexdata.com/v5/launches/query').reply(200, {
			docs: launches
		});

		await store.fetchLaunches();

		expect(store.launches).toEqual(launches);
	});

	it('fetches saved launches', async () => {
		const savedLaunches = [
			{
				_id: '1',
				flight_number: 1,
				name: 'Falcon 1',
				date_utc: '2022-12-01T00:00:00Z'
			}
		];

		mock.onGet('http://localhost:5000/api/launches').reply(
			200,
			savedLaunches
		);

		await store.fetchSavedLaunches();

		expect(store.savedLaunches).toEqual(savedLaunches);
	});

	it('saves a launch', async () => {
		const launch = {
			flight_number: 1,
			name: 'Falcon 1',
			date_utc: '2022-12-01T00:00:00Z'
		};

		mock.onPost('http://localhost:5000/api/launches').reply(201, launch);

		await store.saveLaunch(launch);

		expect(toast).toHaveBeenCalledWith('Saved', expect.any(Object));
		expect(store.savedLaunches).toContainEqual(launch);
	});

	it('handles duplicate save launch error', async () => {
		const launch = {
			flight_number: 1,
			name: 'Falcon 1',
			date_utc: '2022-12-01T00:00:00Z'
		};

		mock.onPost('http://localhost:5000/api/launches').reply(500, {
			message: 'duplicate entry'
		});

		await store.saveLaunch(launch);

		expect(toast).toHaveBeenCalledWith(
			'Duplicate Entry',
			expect.any(Object)
		);
	});

	it('deletes a launch', async () => {
		const launch = {
			_id: '1',
			flight_number: 1,
			name: 'Falcon 1',
			date_utc: '2022-12-01T00:00:00Z'
		};
		store.savedLaunches = [launch];

		mock.onDelete(`http://localhost:5000/api/launches/${launch._id}`).reply(
			204
		);

		await store.deleteLaunch(launch._id!);

		expect(toast).toHaveBeenCalledWith('Deleted', expect.any(Object));
		expect(store.savedLaunches).not.toContainEqual(launch);
	});
});
