import React from "react";
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from 'recharts';
import _ from "lodash";

const Schedule = ({companyShareForSchedule, companies, color}) => {
        const companySorted = _.sortBy(companies, ['companyName'], ['asc']);

        return (
            <div className="mb-5">
                <LineChart
                    width={1000}
                    height={400}
                    data={companyShareForSchedule}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis
                        dataKey="name"
                        type="category"
                        allowDuplicatedCategory={false}
                    />
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    {
                        companySorted.map((company, i) => (
                            <Line
                                key={company.id}
                                isAnimationActive={false}
                                connectNulls
                                type="monotone"
                                dataKey={[company.companyName].toString()}
                                stroke={color[i]}
                                activeDot={{r: 20}}
                                strokeWidth={2}
                            />
                        ))
                    }
                </LineChart>
            </div>
        )
}

export default Schedule