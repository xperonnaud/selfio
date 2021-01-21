
 import Vue from 'vue'
 import moment from "moment";

 const gToKg = 0.001;
 const gToOz = 0.035274;
 const ozToLb = 0.0625;

 Vue.filter("capitalizeFilter", function (value) {
     if (!value) return '';
     return value.toLowerCase()
         .split(' ')
         .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
         .join(' ');
 });

 Vue.filter("weightUnitFilter", function (value, unit = 'g') {
     if (!value) return '';

     if(unit === 'g')
        return value.toFixed(0).replace('.0','');

     if(unit === 'oz')
         return (value * gToOz).toFixed(1).replace('.0','');
 });

 Vue.filter("supWeightUnitFilter", function (value, unit = 'g') {
     if (!value) return '';

     if(unit === 'g')
        return (value * gToKg).toFixed(1);

     if(unit === 'oz')
         return (value * ozToLb).toFixed(1);
 });

 Vue.filter("convertSpecialCharsFilter", function (value) {
     if (!value) return '';
     return value.toString().replace(/_/g," / ");
 });

 Vue.filter("removeSlashFilter", function (value) {
     if (!value) return '';
     return value.toString().substring(1);
 });

 Vue.filter("noDashFilter", function (value) {
     if (!value) return '';
     return value.toString().replace(/-+/g," ")
 });

 Vue.filter("singularFilter", function (value) {
     if (!value) return '';
     return value.toString().replace(/s$/,"").replace(/ie$/,"y")
 });

 Vue.filter("roundIntFilter", function (value) {
     if (!value) return 0;
     return (value).toFixed(0);
 });

 Vue.filter("roundDecimalFilter", function (value) {
     if (!value) return 0;
     return (value).toFixed(2);
 });

 Vue.filter("thousandthFilter", function (value) {
     value = parseFloat(value);
     return (value/1000).toFixed(1);
 });

 Vue.filter("percentageFilter", function (value, list, total) {
     let nbInList = total ? total : list.length;
     return (Math.floor((value / nbInList) * 100));
 });

 Vue.filter("minimalDateFilter", function (date, format = 'DD-MM-YY') {
     if(!date)
         return '.';

     return moment(date).format(format);
 });

 Vue.filter("dateFilter", function (date, format = 'dddd Do MMMM - YYYY') {
     if(!date)
         return '.';

     return moment(date).format(format);
 });

 Vue.filter("mobileDayMonthFilter", function (date) {
     if(!date)
         return '.';

     return moment(date).format('DD-MM');
 });

 Vue.filter("minDateFilter", function (date, format = 'MMM Do YY') {
     if(!date)
         return '.';

     return moment(date).format(format);
 });

 Vue.filter("dayMonthFilter", function (date, format = 'dd MMM Do YYYY') {
     if(!date)
         return '.';

     return moment(date).format(format);
 });

 Vue.filter("yearFilter", function (date) {
     if(!date)
         return '';

     return moment(date).format('YYYY');
 });

 Vue.filter("timeFilter", function (time) {
     if(!time)
         return '';

     return moment(time).format('HH:mm');
 });