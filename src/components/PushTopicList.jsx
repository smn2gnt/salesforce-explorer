"use strict";

const React = require('react');
const { Link } = require('react-router');
const { Header, DataTable } = require('./lds');

module.exports = class PushTopicList extends React.Component {

    componentWillMount() {
        this.props.conn.sobject("PushTopic").find().execute((error, records) => {
            if (error) {
                console.error(error);
                this.setState({
                    error
                });
                return;
            }

            this.setState({
                records
            });
        });
    }

    render() {
        if (!this.state || !this.state.records) {
            return (
                <div><em>Loading...</em></div>
            );
        }

        if (this.state && this.state.error) {
            return (
                <div>{this.state.error}</div>
            );
        }

        const headers = ['Id', 'Name', 'Query'];

        return (
            <div>
                <Header title="Push Topics" />
                <DataTable
                    headers={headers}
                    records={this.state.records}
                    onClick={(record) => {
                        console.log(record);
                        this.props.router.push(`/push/${record.Id}`)
                    }}
                />
            </div>
        );
    }
};