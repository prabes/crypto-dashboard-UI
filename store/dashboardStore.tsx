import axios from "axios";
import { makeAutoObservable, observable, runInAction } from 'mobx';

class DashboardStore {

	cryptoList = [];
	status = "initial";
	searchQuery = "";
	pageNumber = 1;
	isAscending = true;

	constructor() {
		makeAutoObservable(this, {
			cryptoList: observable,
			status: observable,
			searchQuery: observable,
			pageNumber: observable,
			isAscending: observable
		});
	}

	fetchApiCryptoList = async (urlParams) => {
		try {
			const apiUrl = "http://localhost:8080/api/crypto_details"
			let cryptoListFromApi = await axios.get(apiUrl, { params: urlParams });
			let data = cryptoListFromApi.data;
			runInAction(() => {
				this.cryptoList = data.details;
				this.status = 'success'
			});
			debugger
		} catch (error) {
			console.log("Error:::", error)
		}
	}

	getCryptoList = async () => {
		try {
			const params = {
				pageNumber: this.pageNumber,
				searchQuery: this.searchQuery,
				isAscending: this.isAscending,
			}
			// const urlParams = new URLSearchParams(params);
			const data = await this.fetchApiCryptoList(params)
		} catch (e) {
			runInAction(() => {
				this.status = "error"
			})
		}
	}
}

const dashboardStore = new DashboardStore();

export default dashboardStore;
export { DashboardStore };