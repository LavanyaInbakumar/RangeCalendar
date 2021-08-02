import React from "react";
import "./calendar.scss";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import dateFormat from 'dateformat';
import originalMoment from "moment";
import { extendMoment } from "moment-range";
import dateformat from 'dateformat';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Okay from './images/okay.png'
const moment = extendMoment(originalMoment);
// const Current_date = (dateFormat(new Date(), "ddd, dd mmm yyyy"))

export default class Calendar extends React.Component {
  weekdayshort = moment.weekdaysShort();

  state = {
    showYearTable: false,
    showMonthTable: false,
    showDateTable: true,
    dateObject: moment(),
    allmonths: moment.months(),
    selectedDay: null,
    currentdate: moment().format("mmm"),
    fulldate: "",
    rangeSelect: [],
    rangeSelectFirst: [],
    slotSubtract: 1,
    slotAdd: 1,
    TotalslotsAvailable: [],
    from_to_date:[],
    spinLoad: true,
    ModalOpen:false,
    disblerange:[],
  };
  handleClose=()=>{
    this.setState({ModalOpen:false})
  }
  handleOpen=()=>{
    this.setState({ModalOpen:true})
  }

  daysInMonth = () => {
    return this.state.dateObject.daysInMonth();
  };
  year = () => {
    console.log(this.state.dateObject.format("Y"), "year")

    return this.state.dateObject.format("Y");
  };
  currentDay = () => {
    console.log(this.state.dateObject.format("month"), "currentday")
    return this.state.dateObject.format("D");
  };
  firstDayOfMonth = () => {
    let dateObject = this.state.dateObject;
    let firstDay = moment(dateObject)
      .startOf("month")
      .format("d"); // Day of week 0...1..5...6
    console.log(firstDay,"divyarrr")
      
    return firstDay;

  };
  month = () => {
    return this.state.dateObject.format("MMM");
  };
  setMonth = month => {
    let monthNo = this.state.allmonths.indexOf(month);
    let dateObject = Object.assign({}, this.state.dateObject);
    dateObject = moment(dateObject).set("month", monthNo);
    this.setState({
      dateObject: dateObject,
      showMonthTable: !this.state.showMonthTable,
      showDateTable: !this.state.showDateTable
    });
  };
  MonthList = props => {
    let months = [];
    props.data.map(data => {
      months.push(
        <td
          key={data}
          className="calendar-month"
          onClick={e => {
            this.setMonth(data);
          }}
        >
          <span>{data}</span>
        </td>
      );
    });
    let rows = [];
    let cells = [];

    months.forEach((row, i) => {
      if (i % 3 !== 0 || i == 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
    });
    rows.push(cells);
    let monthlist = rows.map((d, i) => {
      return <tr>{d}</tr>;
    });

    return (
      <table className="calendar-month">
        <thead>
          <tr>
            <th colSpan="4">Select a Month</th>
          </tr>
        </thead>
        <tbody>{monthlist}</tbody>
      </table>
    );
  };
  showYearTable = e => {
    this.setState({
      showYearTable: !this.state.showYearTable,
      showDateTable: !this.state.showDateTable
    });
  };

  onPrev = () => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    var monthmatch = []
    var yearmatch = []

    for(let i = 0;i<monthNames.length;i++){
      if(this.month()===monthNames[i]){
        if(this.month()==="Jan"){
          yearmatch.push(Number(this.year())-1)
          monthmatch.push("Dec")
          break;
        }else{
        monthmatch.push(monthNames[i-1])
        yearmatch.push(this.year())
        break;
        }
      }
    }
    var monthmatchNum = []

    for(let j=0;j<monthNames.length;j++){
      if(monthNames[j]===monthmatch[0]){
        monthmatchNum.push(j+1)
      }
    }

    var totaldaycount = new Date(Number(yearmatch[0]), Number(monthmatchNum[0]), 0).getDate()
    console.log(totaldaycount,"totaldaycount")

    var fromdate = dateformat(yearmatch[0] +" " +monthmatch[0] +" " +1, "yyyy-mm-dd")
    var todate = dateformat(yearmatch[0] +" " +monthmatch[0] +" " +totaldaycount, "yyyy-mm-dd")

    console.log(fromdate,"monthmatch")
    console.log(todate,"monthmatch")

    // this.getslots(fromdate,todate )

    let curr = "";
    if (this.state.showYearTable === true) {
      curr = "year";
    } else {
      curr = "month";
    }

    this.setState({
      dateObject: this.state.dateObject.subtract(1, curr),
    });
  };
  onNext = () => {
    this.setState({spinLoad:true})
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    var monthmatch = []
    var yearmatch = []

    for(let i = 0;i<monthNames.length;i++){
      if(this.month()===monthNames[i]){
        if(this.month()==="Dec"){
          yearmatch.push(Number(this.year())+1)
          monthmatch.push("Jan")
          break;
        }else{
        monthmatch.push(monthNames[i+1])
        yearmatch.push(this.year())
        break;
        }
      }
    }

    var monthmatchNum = []

    for(let j=0;j<monthNames.length;j++){
      if(monthNames[j]===monthmatch[0]){
        monthmatchNum.push(j+1)
      }
    }

    var totaldaycount = new Date(Number(yearmatch[0]), Number(monthmatchNum[0]), 0).getDate()
    console.log(totaldaycount,"totaldaycount")

    var fromdate = dateformat(yearmatch[0] +" " +monthmatch[0] +" " +1, "yyyy-mm-dd")
    var todate = dateformat(yearmatch[0] +" " +monthmatch[0] +" " +totaldaycount, "yyyy-mm-dd")

    console.log(fromdate,"monthmatch")
    console.log(todate,"monthmatch")

    // this.getslots(fromdate,todate )

    let curr = "";
    if (this.state.showYearTable === true) {
      curr = "year";
    } else {
      curr = "month";
    }
    this.setState({
      dateObject: this.state.dateObject.add(1, curr),
    });
  };
  setYear = year => {
    let dateObject = Object.assign({}, this.state.dateObject);
    dateObject = moment(dateObject).set("year", year);
    this.setState({
      dateObject: dateObject,
      showMonthTable: !this.state.showMonthTable,
      showYearTable: !this.state.showYearTable
    });
  };
  onYearChange = e => {
    this.setYear(e.target.value);
  };
  getDates(startDate, stopDate) {
    var dateArray = [];
    var currentDate = moment(startDate);
    var stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
      dateArray.push(moment(currentDate).format("YYYY"));
      currentDate = moment(currentDate).add(1, "year");
    }
    return dateArray;
  }
  YearTable = props => {
    let months = [];
    let nextten = moment()
      .set("year", props)
      .add("year", 12)
      .format("Y");

    let tenyear = this.getDates(props, nextten);

    tenyear.map(data => {
      months.push(
        <td
          key={data}
          className="calendar-month"
          onClick={e => {
            this.setYear(data);
          }}
        >
          <span>{data}</span>
        </td>
      );
    });
    let rows = [];
    let cells = [];

    months.forEach((row, i) => {
      if (i % 3 !== 0 || i == 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
    });
    rows.push(cells);
    let yearlist = rows.map((d, i) => {
      return <tr>{d}</tr>;
    });

    return (
      <table className="calendar-month">
        <thead>
          <tr>
            <th colSpan="4">Select a Yeah</th>
          </tr>
        </thead>
        <tbody>{yearlist}</tbody>
      </table>
    );
  };

  onDayClick = (e, d) => {
    console.log(d, this.month(), this.year(), "insideclick")
    var datearr = []
    var rangeSelect = []
    var rangeSelectFirst = []
    var startDatestore = []
    var from_to_date=[]
    const date=new Date()
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var disblerange=[]
   
    if (this.state.fulldate.length === 0) {
      startDatestore.push(new Date(this.month() + "-" + this.year() + "-" + d))
      rangeSelect.push(`selectedclr${d}${this.month()}${this.year()}`)
      from_to_date.push(`${d}-${this.month()}-${this.year()}`)
      disblerange.push(true)
    //  send date value to parent
      // this.props.getDate({startdate:new Date(this.month() + "-" + this.year() + "-" + d),enddate:null})
   
      console.log(disblerange,"falsw")
    }
    else if (this.state.fulldate.length === 1) {
      disblerange.push(false)
      var initialstartDate = this.state.startDatestore[0]
      var initialendDate = new Date(new Date(this.month() + "-" + this.year() + "-" + d))

      // send date value to parent
      // this.state.getDate({startdate:initialstartDate,enddate:new Date(this.month() + "-" + this.year() + "-" + d)})
      var startDate = []
      var endDate = []

      if (initialstartDate > initialendDate) {
        startDate.push(new Date(new Date(this.month() + "-" + this.year() + "-" + d)))
        endDate.push(this.state.startDatestore[0])
      }
      else if (initialstartDate < initialendDate) {
        startDate.push(this.state.startDatestore[0])
        endDate.push(new Date(new Date(this.month() + "-" + this.year() + "-" + d)))
      }
      else {
        startDate.push(this.state.startDatestore[0])
        endDate.push(this.state.startDatestore[0])
      }


      var
        arr = new Array(),
        dt = new Date(startDate[0] - 1);

      while (dt <= endDate[0] - 1) {
        arr.push(new Date(dt));
        dt.setDate(dt.getDate() + 1);
        rangeSelect.push(`selectedclr${dt.getDate()}${monthNames[dt.getMonth()]}${moment(new Date(dt)).format("YYYY")}`)
        from_to_date.push(`${dt.getDate()}-${monthNames[dt.getMonth()]}-${moment(new Date(dt)).format("YYYY")}`)
       console.log(rangeSelect,"seelct")
      }
    }
    else if (this.state.fulldate.length === 2) {
      startDatestore.push(new Date(this.month() + "-" + this.year() + "-" + d))
      rangeSelect.push(`selectedclr${d}${this.month()}${this.year()}`)
      
      // send date value to parent
      // this.props.getDate({startdate:new Date(this.month() + "-" + this.year() + "-" + d),enddate:null})
    }


    if (this.state.fulldate.length <= 1) {
      datearr.push(...this.state.fulldate, `selectedclr${d}${this.month()}${this.year()}`)
    }
    else {
      datearr.push(`selectedclr${d}${this.month()}${this.year()}`)
    }
    console.log(datearr,"datearr")
    this.props.changeData&&this.props.changeData(datearr)
    this.setState(
      {
        selectedDay: d,
        fulldate: datearr,
        selectedMonth: this.month(),
        selectedYear: this.year(),
        rangeSelect: rangeSelect,
        rangeSelectFirst: rangeSelectFirst,
        startDatestore: startDatestore,
        from_to_date:from_to_date
      },
    );
  };

  componentDidMount(){
    
  }



  render() {
    const { match, location, history } = this.props

    console.log(this.state.rangeSelect, "rangeSelect")

    let weekdayshortname = this.weekdayshort.map(day => {
      return <th key={day}>{day}</th>;
    });

    let blanks = [];

    for (let i = 0; i < this.firstDayOfMonth(); i++) {
      blanks.push(<td className="calendar-day empty"></td>);
    }

    let daysInMonth = [];
    var hidepastdataleft = []
    var disble=[]
    var disblerange=[]

    for (let p = 1; p <= this.daysInMonth(); p++) {
    
      if(dateformat(this.year()+" "+this.month()+" "+p,"yyyy,mm,dd") === dateformat(new Date(),"yyyy,mm,dd")){
         hidepastdataleft.push(false)
        //  disble.push(false)
      }
      else{
        hidepastdataleft.push(true)
        // disble.push(true)
      }
      console.log(disble,"ssshide")
      
      console.log(new Date(dateformat(this.year()+" "+this.month()+" "+p,"yyyy,mm,dd")),"newdate")
      if(new Date() < new Date(dateformat(this.year()+" "+this.month()+" "+p,"yyyy,mm,dd")) || dateformat(this.year()+" "+this.month()+" "+p,"yyyy,mm,dd") === dateformat(new Date(),"yyyy,mm,dd") ){
        var hidepastdata = true
      }
      else{
        var hidepastdata = false
      }
    }
    if(hidepastdata){
    for (let d = 1; d <= this.daysInMonth(); d++) {
      const startdate = `selectedclr${d}${this.state.dateObject.format("MMM")}${this.state.dateObject.format("Y")}`
      let currentDay = d == this.currentDay() ? "today" : "";
      var textgreyhide = new Date() < new Date(dateformat(this.year()+" "+this.month()+" "+d,"yyyy,mm,dd")) || dateformat(this.year()+" "+this.month()+" "+d,"yyyy,mm,dd") === dateformat(new Date(),"yyyy,mm,dd") 
      disblerange.push(new Date().d==5)
      console.log(disblerange,"fghjk")
      daysInMonth.push(

        <td key={d} className={`calendar-day ${currentDay} ${!textgreyhide && "cursornonehide"} `} onClick={textgreyhide && (e => { this.onDayClick(e, d); })}>
          <div className="range_parent w-100">

            <div className="range_child w-25">
            </div>
            <div
              className={` ${startdate === this.state.rangeSelect[0] && "table_fir_sel" ||
                startdate === this.state.rangeSelect[this.state.rangeSelect.length - 1] && "table_sec_sel" ||
                this.state.rangeSelect.includes(startdate) && "table_inter_sel" }`}
            >
              <span className={`${!textgreyhide && "colornonepast"} table-body`}>
                {d}
              </span>
            </div>
            <div className="range_btm w-25">
            </div>
          </div>

          {/* {
              this.state.TotalslotsAvailable[d - 1] && this.state.TotalslotsAvailable[d - 1].day !==5 &&
              <div className="inner_totalslots">
            {
              this.state.TotalslotsAvailable[d - 1] && this.state.TotalslotsAvailable[d - 1].total
            }
           </div>
      } */}

          {/* <div className="inner_availslots">
            {this.props.slots ? this.props.slots.map((val) => {
              return (
                val.currentDayId === 4 && d === 22 && val.availableSlots
              )
            }) : "0"}
          </div> */}

        </td>
      );
    }
  }
    var totalSlots = [...blanks, ...daysInMonth];
    let rows = [];
    let cells = [];

    totalSlots.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
      if (i === totalSlots.length - 1) {
        // let insertRow = cells.slice();
        rows.push(cells);
      }
    });

    let daysinmonth = rows.map((d, i) => {
      return <tr>{d}</tr>;
    });

    return (
      <div className="range_parent_calendar_root">
          <div className="my_sch">{this.props.heading}</div>
        <div className="range_upcom_div">
          <div className="sch_head_name">
            <div>{this.props.Name_of_type}</div>
            {this.props.upcomingdays==="enable" &&<div><label className="mem_pro_cont">Remaining Days -</label><label className="sch_head_days">0</label></div>}
          </div>
          <div className="upcom_cnt_inside">
            <div className="mem_pro_cont">{this.props.category}</div>
            <div>{this.props.amt}</div>
          </div>
        </div>
        <div  style={{width:"100%",display:"flex"}}>
      <div className="tail-datetime-calendar">
        <div className="calendar-navi">
          {/* <div>{Current_date}</div> */}
          
            <ChevronLeftIcon className="date_arrow" onClick={hidepastdataleft.every((val)=>val===true) && (e => { this.onPrev(); })} />
            {!this.state.showMonthTable && (
              <span
                // onClick={e => {
                //   this.showMonth();
                // }}
                class="calendar-label"
              >
                {this.month()}
              </span>
            )}
            {/* <span  onClick={e => this.showYearTable()}>{this.year()}</span> */}
            <span>{this.year()}</span>
            <ChevronRightIcon className="date_arrow" onClick={e => { this.onNext(); }} />
             
        </div>

        <div className="calendar-date">
          {this.state.showYearTable && <this.YearTable props={this.year()} />}
          {this.state.showMonthTable && (
            <this.MonthList data={moment.months()} />
          )}
        </div>



        {this.state.showDateTable && (
          <div className="calendar-date">
              <table className="calendar-day">
                <thead className="weekday_shortname">
                  <tr>{weekdayshortname}</tr>
                </thead>
                <tbody className="table_body">{daysinmonth}</tbody>
              </table>

            {this.props.SelectDate==="enable"&&<div className="date_select_cont">
            {this.state.from_to_date.length>0?<label>{(this.state.from_to_date[0] +"to"+ this.state.from_to_date.pop())}</label>:<label>Select the Start Date</label>}
            </div>}
            {this.props.Shedule_dots==="enable"&&<div className="days_in_clr_points">
        <div className="dot_cir_div"><label className="b_dot_circle"></label><label>Completed Days</label></div>
        <div className="dot_cir_div"><label className="b_dot_circle_up"></label><label>Upcoming Days</label></div>
        <div className="dot_cir_div"><label className="b_dot_circle_ex"></label><label>To be Rescheduled Day</label></div>
        </div>}
        {this.props.MyShedule_dots==="enable"&&<div className="days_in_clr">
        <div className="dot_cir_div"><label className="b_dot_circle"></label><label>Completed Days</label></div>
        <div className="dot_cir_div"><label className="b_dot_circle_up"></label><label>Upcoming Days</label></div>
        <div className="dot_cir_div"><label className="b_dot_circle_ex"></label><label>To be Rescheduled Day</label></div>
        <div className="dot_cir_div"><label className="b_res_circle_ex"></label><label> Rescheduled Day</label></div>

        </div>}
        {this.props.trainer_MyShedule_dots==="enable"&&<div className="days_in_clr">
        <div className="dot_cir_div"><label className="b_dot_circle"></label><label>Completed Days</label></div>
        <div className="dot_cir_div"><label className="b_dot_circle_up"></label><label>Remaining Days</label></div>
        <div className="dot_cir_div"><label className="b_dot_circle_ex"></label><label>To be Rescheduled Day</label></div>
        <div className="dot_cir_div"><label className="b_res_circle_ex"></label><label> Rescheduled Day</label></div>

        </div>}
       
       
          </div>
        )}
      </div>
      </div>
      {this.props.reschedule==="enable"&&<div className="b_re_div"><Button className="b_reshe" onClick={this.handleOpen}>Reschedule</Button></div>}
      <Dialog
          open={this.state.ModalOpen}
          onClose={this.handleClose}
          className="modal_res"
           maxWidth={400}
        >
          <div className="reshe_confirm_msg">
            <img src={Okay} className="res_ok_img"/>
            <div className="tq_msg">Thank You</div>
            <div className="re_book">Your Booking has been <br/> Rescheduled</div>
            <Button className="ok_btn_re" onClick={this.handleClose}>Ok</Button>
          </div>
          
       
        </Dialog>

      </div>
    );
  }
}