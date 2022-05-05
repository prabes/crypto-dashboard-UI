
import axios from 'axios';
import React, { useState } from 'react'
import { AsyncTypeahead } from 'react-bootstrap-typeahead'

interface ISearchProps {
	placeholder?: string
}

const SearchBox: React.FunctionComponent<ISearchProps> = ({ placeholder }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [options, setOptions] = useState([]);
	const SEARCH_URI = process.env.API_BASE_URL + `/api/crypto_details`

	const handleSearch = async (query) => {
		debugger
		setIsLoading(true);
		const urlParams = {
			searchQuery: query ,
			pageNumber: 1,
			perPage: 10
		}
		const searchResult = await axios.get(SEARCH_URI, { params: urlParams });
		const { details } = searchResult.data

		const options = details.map((row) => ({
			id: row.coinId,
			name: row.name,
			symbol: row.symbol
		}))

		setOptions(options)
		setIsLoading(false)
		debugger
	};
	// Bypass client-side filtering by returning `true`. Results are already
	// filtered by the search endpoint, so no need to do it again.
	const filterBy = () => true;

	return (
		<AsyncTypeahead
			filterBy={filterBy}
			id="async-example"
			isLoading={isLoading}
			labelKey="name"
			minLength={3}
			onSearch={handleSearch}
			options={options}
			placeholder={placeholder || "Search"}
			renderMenuItemChildren={(option, props) => (
				<>
					<span>{option.name} - {option.symbol} </span>
				</>
			)}
		/>
	);
};

export default SearchBox;