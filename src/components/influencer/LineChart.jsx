import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  // Legend,
  ResponsiveContainer,
} from "recharts";

class CustomizedAxisTick extends PureComponent {
  render() {
    const { x, y, payload, data } = this.props;

    let link;
    try {
      link = data.filter((item) => {
        if (payload.value === item.name) {
          return true;
        }
      })[0].link;
    } catch (error) {
      link = "/";
      console.log("GAGAL LINK");
    }
    return (
      <svg x={x - 12} y={y + 4}>
        <foreignObject width="24" height="24">
          <div
            xmlns="http://www.w3.org/1999/xhtml"
            style={{ textAlign: "center" }}
          >
            {/* <a href={data[payload.value - 1].link} target="_blank"> */}
            <a href={link} target="_blank" rel="noreferrer">
              {payload.value}
            </a>
          </div>
        </foreignObject>
      </svg>
    );
  }
}
// const renderCustomAxisTick = ({ x, y, payload, ...props }) => {
//   let path = "";

//   switch (payload.value) {
//     case 1:
//       path =
//         "M899.072 99.328q9.216 13.312 17.92 48.128t16.384 81.92 13.824 100.352 11.264 102.912 9.216 90.112 6.144 60.928q4.096 30.72 7.168 70.656t5.632 79.872 4.096 75.264 2.56 56.832q-13.312 16.384-30.208 25.6t-34.304 11.264-34.304-2.56-30.208-16.896q-1.024-10.24-3.584-33.28t-6.144-53.76-8.192-66.56-8.704-71.68q-11.264-83.968-23.552-184.32-7.168 37.888-11.264 74.752-4.096 31.744-6.656 66.56t-0.512 62.464q1.024 18.432 3.072 29.184t4.608 19.968 5.12 21.504 5.12 34.304 5.12 56.832 4.608 90.112q-11.264 24.576-50.688 42.496t-88.576 29.696-97.28 16.896-74.752 5.12q-18.432 0-46.08-2.56t-60.416-7.168-66.048-12.288-61.952-17.92-49.664-24.064-28.16-30.208q2.048-55.296 5.12-90.112t5.632-56.832 5.12-34.304 5.12-21.504 4.096-19.968 3.584-29.184q2.048-27.648-0.512-62.464t-6.656-66.56q-4.096-36.864-11.264-74.752-13.312 100.352-24.576 184.32-5.12 35.84-9.216 71.68t-8.192 66.56-6.656 53.76-2.56 33.28q-13.312 12.288-30.208 16.896t-34.304 2.56-33.792-11.264-29.696-25.6q0-21.504 2.048-56.832t4.096-75.264 5.632-79.872 6.656-70.656q2.048-20.48 6.144-60.928t9.728-90.112 11.776-102.912 13.824-100.352 16.384-81.92 17.92-48.128q20.48-12.288 56.32-25.6t73.216-26.624 71.168-25.088 50.176-22.016q10.24 13.312 16.896 61.44t13.312 115.712 15.36 146.432 23.04 153.6l38.912-334.848-29.696-25.6 43.008-54.272 15.36 2.048 15.36-2.048 43.008 54.272-29.696 25.6 38.912 334.848q14.336-74.752 23.04-153.6t15.36-146.432 13.312-115.712 16.896-61.44q16.384 10.24 50.176 22.016t71.168 25.088 73.216 26.624 56.32 25.6";
//       break;
//   }
//   // console.log(payload);
//   return (
//     <svg x={x - 12} y={y + 4}>
//       <foreignObject width="24" height="24">
//         <div
//           xmlns="http://www.w3.org/1999/xhtml"
//           // style={{ textAlign: "center" }}
//         >
//           <a href={""} target="_blank">
//             {payload.value}
//           </a>
//         </div>
//       </foreignObject>
//     </svg>
//   );
// };

const Example = ({ data }) => {
  return (
    // <div style={{ width: "100%", height: "100%" }}>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        // width={500}
        // height={200}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={<CustomizedAxisTick data={data} />} />
        <YAxis />
        <Tooltip />
        <Line
          connectNulls
          type="monotone"
          dataKey="uv"
          stroke="#8884d8"
          fill="#8884d8"
        />
      </LineChart>
    </ResponsiveContainer>
    // </div>
  );
};

export default Example;
