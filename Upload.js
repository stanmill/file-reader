import React from "react"
import ReactFileReader from "react-file-reader"
import {CsvToHtmlTable} from "react-csv-to-table"
import {sampleData} from "react-csv-to-table/example/sample"

class Upload extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            csvData: '',
            searchVal: ''
        }
        this.updateSearch = this.updateSearch.bind(this);
        this.filterSearchResults = this.filterSearchResults.bind(this);
    }

    updateSearch(event) {
        const searchVal = event.target.value;
        this.setState({ searchVal });
        
        let csvData = this.state.csvData
            .split("\n").map(el => el.split(",")) // splits data apart
            .flat(2) // flattens 2D nested array
        
        this.filterSearchResults(searchVal, csvData)
    }

    filterSearchResults(value, data) {
        const regex = new RegExp(value)
        let results = []
        data.forEach(d => {
            const match = regex.test(d)
            if (match) { results.push(d)} 
        })
      
        this.setState({csvData: results.toString()})
        console.log('here are our filtering results')
        console.log(results[0])
    }

    // imports files and stores information in a variable called csvData
    handleFiles = files => {
        let reader = new FileReader();
        reader.onload = () => {
            this.setState({
                csvData: reader.result
            })
        }
        reader.readAsText(files[0])        

    }
    
    // the table components takes the csv data stored in the
    // csvData variable to render into the page
    render(){
       
        return (
            <div>
                <h1 className="heading">csv file reader</h1>
               
                <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
                    <button className='primary'>Upload</button>
                </ReactFileReader>
                
                <input type = "text"
                    className = "searchBar" 
                    placeholder = "Filter Results" 
                    value={this.state.searchVal} 
                    onChange={this.updateSearch} />
               
                <CsvToHtmlTable 
                    data = {this.state.csvData} 
                    csvDelimiter = ","
                    hasHeader = {true}
                    tableClassName = "table table-striped table-hover"
                    tableRowClassName={this.state.searchVal}
                   />

            </div>
        )
    }
}

export default Upload;