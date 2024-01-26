import d1 from '../assets/weather-img/01d.svg';
import n1 from '../assets/weather-img/01n.svg';
import d2 from '../assets/weather-img/02d.svg';
import n2 from '../assets/weather-img/02n.svg';
import d3 from '../assets/weather-img/03d.svg';
import n3 from '../assets/weather-img/03n.svg';
import d4 from '../assets/weather-img/04d.svg';
import n4 from '../assets/weather-img/04n.svg';
import d9 from '../assets/weather-img/09d.svg';
import n9 from '../assets/weather-img/09n.svg';
import d10 from '../assets/weather-img/10d.svg';
import n10 from '../assets/weather-img/10n.svg';
import d11 from '../assets/weather-img/11d.svg';
import n11 from '../assets/weather-img/11n.svg';
import d13 from '../assets/weather-img/13d.svg';
import n13 from '../assets/weather-img/13n.svg';

function weatherIcon(weatherInfo: string) {
  const weatherItIs = weatherInfo === "01d" ? d1
  : weatherInfo === "01n" ? n1
    : weatherInfo === "02d" ? d2
      : weatherInfo === "02n" ? n2
        : weatherInfo === "03d" ? d3
          : weatherInfo === "03n" ? n3
            : weatherInfo === "04d" ? d4
              : weatherInfo === "04n" ? n4
                : weatherInfo === "09d" ? d9
                  : weatherInfo === "09n" ? n9
                    : weatherInfo === "10d" ? d10
                      : weatherInfo === "10n" ? n10
                        : weatherInfo === "11d" ? d11
                          : weatherInfo === "11n" ? n11
                            : weatherInfo === "13d" ? d13
                              : weatherInfo === "13n" ? n13
                                : "";
  return weatherItIs
}

export default weatherIcon;