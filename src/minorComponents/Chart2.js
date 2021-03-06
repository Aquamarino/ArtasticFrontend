import React from "react";
import {

  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,

  Guide,

} from "bizcharts";
import DataSet from "@antv/data-set";

function Donut(props){

    const {datum}=props;
    console.log(datum);
    const { DataView } = DataSet;
    const { Html } = Guide;




    const dv = new DataView();
    dv.source(datum).transform({
      type: "percent",
      field: "clicknum",
      dimension: "sex",
      as: "percent"
    });
    const cols = {
      percent: {
        formatter: val => {
          val = val * 100 ;
          return (parseInt(val)+ "%");
        }
      }
    };
    return (
      <div>
        <Chart
          height={window.innerHeight}
          data={dv}
          scale={cols}
          padding={[80, 100, 80, 80]}
          forceFit
        >
          <Coord type={"theta"} radius={0.75} innerRadius={0.6} />
          <Axis name="percent" />
          <Legend
            position="right"
            offsetY={-window.innerHeight / 2 + 120}
            offsetX={-100}
          />
          <Tooltip
            showTitle={false}
            itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
          />
          <Guide>
            <Html
              position={["50%", "50%"]}
              html="<div style=&quot;color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;&quot;>Gender</div>"
              alignX="middle"
              alignY="middle"
            />
          </Guide>
          <Geom
            type="intervalStack"
            position="percent"
            color="sex"
            tooltip={[
              "sex*percent",
              (sex, percent) => {
                percent = percent * 100 + "%";
                return {
                  name: sex,
                  value: sex==='boy'?datum[0]['clicknum']:datum[1]['clicknum'],
                };
              }
            ]}
            style={{
              lineWidth: 1,
              stroke: "#fff"
            }}
          >
            <Label
              content="percent"
              formatter={(val, sex) => {
                return sex.point.sex + ": " + val;
              }}
            />
          </Geom>
        </Chart>
      </div>
    );
  }


export default Donut;