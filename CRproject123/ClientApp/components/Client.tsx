import * as React from 'react';
import { RouteComponentProps } from 'react-router';


interface DataState {
    clients: Client[];
    loading: boolean;
    inputValue: any;
}


export class Clients extends React.Component<RouteComponentProps<{}>, DataState>{

    public variable: string;


    constructor() {
        super();
        this.state = { clients: [], loading: true, inputValue: "" };

        this.variable = "GetAll";
        this.updateValue = this.updateValue.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.del = this.del.bind(this);
        

        fetch(this.variable)
            .then(response => response.json() as Promise<Client[]>)
            .then(data => {
                this.setState({ clients: data, loading: false });
            });
    }

    public render() {
        let clientTable = this.state.loading
            ? <p><em>Loading...</em></p>
            : Clients.renderClientsTable(this.state.clients)
        return <div>
            <h1>JSON data output </h1>
            <p> For now, some fluff text. Anyway the wind blows. </p>
            <form onSubmit={this.handleSubmit}>
                <input value={this.state.inputValue} onChange={this.updateValue} />

                <button onClick={this.del} >Delete </button>

                <button onClick={this.add} >Add </button>
            </form>
            {clientTable}

        </div>;
    }


    private static renderClientsTable(clients: Client[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {clients.map(client =>
                    <tr key={client.id}>
                        <td>{client.id}</td>
                        <td>{client.name}</td>
                        <td>{client.email}</td>
                        <td> <button onClick={this.test} >Delete </button> </td>

                    </tr>
                )}
            </tbody>
        </table>;
    }

    updateValue(newinputValue: any) {

        this.setState({ inputValue: newinputValue.value });

    }

    handleSubmit(event: any) {
        event.preventDefault();
    }

    del( ): any {

   //     var X = this.state.inputValue.value;
        var X = "4";
        
        var test = new XMLHttpRequest(), method = 'GET', url = '/DelClient/' + X;

        test.open(method, url, true);
        
        test.send();

        window.location.reload();
    }

    add(): any{
        var test = new XMLHttpRequest(), method = 'GET', url = "/AddClient";

        test.open(method, url, true);
        
        test.send();

        window.location.reload();
    }


    static test(): any {
        var X = "4";
        var test = new XMLHttpRequest(), method = 'GET', url = "/DelClient/" + X;

        test.open(method, url, true);

        test.send();

        window.location.reload();
    }


}



interface Client {
    id: number;
    name: string;
    email: string;
}
