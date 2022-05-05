import axios from "axios";
import { makeAutoObservable, observable, runInAction } from 'mobx';


interface IParams {
	pageNumber: number
	searchQuery: string
	isAscending: string
	perPage: number
}

class DashboardStore {
	cryptoList = [];
	status = "initial";
	searchQuery = "";
	pageNumber = 1;
	isAscending = 'ASC';
	perPage = 10;

	constructor() {
		makeAutoObservable(this, {
			cryptoList: observable,
			status: observable,
			searchQuery: observable,
			pageNumber: observable,
			isAscending: observable
		});
	}

	fetchApiCryptoList = async (urlParams: IParams) => {
		try {
			const apiUrl = `http://localhost:8080/api/crypto_details`
			let cryptoListFromApi = await axios.get(apiUrl, { params: urlParams });
			let { data } = cryptoListFromApi;
			runInAction(() => {
				this.cryptoList = data;
				this.status = 'success'
			});
		} catch (error) {
			console.log("Error:::", error)
		}
	}

	getCryptoList = async (urlParams:IParams) => {
		try {
			const params = {
				pageNumber: urlParams?.pageNumber || this.pageNumber,
				searchQuery: urlParams?.searchQuery || this.searchQuery,
				isAscending: urlParams?.isAscending || this.isAscending,
				perPage: urlParams?.perPage || this.perPage
			}
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