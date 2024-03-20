import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Css/page2.css";

const Page2 = () => {
  const setting = {
    dots: false,
    infinity: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1600,
  };
  return (
    <div className="page2 container-fluid bg-black">
      <div className="row">
        <div className="col-6">
          <p className="page2_context1 h2 text-light">New products in 2024</p>
        </div>
        <div className="col-5">
          <Slider className="slider" {...setting}>
            <div className="image">
              <img
                className="img-clock"
                src="https://s3-alpha-sig.figma.com/img/e4e5/f8ef/ac304a49668851d42c57a977c7698757?Expires=1711324800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SXrtchVUOBUQkiLm5Qc8SfwFnW7QUbs~4r-zgCc4AQOTZCKPGiG3P5FV7xwMuKsaAMKNyyuW3hdRUT5kRm5fGnFhohJTtjF0DfBPyZogvVESRMMVibhqxj7g0iofQM7T768CeFHQbN9N1VVxjNlgT9yl0kLGwsKzEAEoXlGGFqaUxhZdLIIZ-TPVIee6r3gt3An~1rO~cM3~UJKgN5zv-v-SvBNRmzlEwqfKcUSwC2LzTYtVkPmySL5yEcrxyQ2v4Jn0kTddnprboO1CqRGpRB4O5dIkYwpBKALTVbYYl43gfcEoIv0mJgm2rYkHDufM~xh2tgarADB7ehKkMhlXVg__"
                alt="clock"
              />
            </div>
            <div className="image">
              <img
                className="img-clock"
                src="https://s3-alpha-sig.figma.com/img/ab31/34a2/9c215f7a597069cf813f3fd8469974f8?Expires=1711324800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mXQ6NNRsYYTflrvp2VVbi1lhtugOTZDFHc9q432Mkj-ROqZYoW2SKj928i1btcYsqC~XayPAXByYX6OH3NJvTYvC1oKf8OaOMfuAZzZBcBsF0phSQyykynbMEfdZFgctF88PZH-yhfXdodQZdUs8b~Nm2ufvvR1iRhpJqhj1AtPVKGMTa~q~ffpSslHmvwBqljonOeGntPtBrZy89rFUMSi6wjyBnlEeDxFHqmUL8yF0kFpp1HDvQ2kBr-qfoO6SrKlUjsuyJVCZff1g0eZHYYl-VdHi7zgX4032mMax-axnVg74-YQKZJVh0Xdze8ZRiaswYY3nuFL2p0r7MMQNIQ__"
                alt="clock"
              />
            </div>
            <div className="image">
              <img
                className="img-clock"
                src="https://s3-alpha-sig.figma.com/img/a4fb/f9f6/4e8fc14acf663381e57ec0699a12dc24?Expires=1711324800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qmIQXQPsI6CNZp1eIiAfm8P6OZaOPjkRCecQNlY1vMQBiLjyU7Y6~P1o~bhf3x0tIaemc0aEht4fzIUQZV7f-7fFWd0TlSP2SEmM5G3B3gyTOfZj9d1I32BOGOsI6LubuZdxqPzYE4DjLT7lwXHV9HjNcvVmLxQS0rOMvM8~tkbZKhXp59LMhTKV2n9wP~nbfDNO7svtEaUTNVw~-KGqv3GOytqElmyNFv23aGerohCWMpoPIJIWbupifusWc8il~bWpGVFu4ouvjSKc~I0ZjjDD0EZuffG7NEFymAO9lOzLO-7os1KtKlKB2M~CATkCaSzSj42x~ch~QMxeDAh3Gg__"
                alt="clock"
              />
            </div>
            <div className="image">
              <img
                className="img-clock"
                src="https://s3-alpha-sig.figma.com/img/dcce/60c9/681bc0672cab32b0dd2eddc00cbf0cf7?Expires=1711324800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CJ8P3Kqmrm~3NzvwBuLHMB2I-QWgK3uU4DE3nxoUW3fYOICtPrndq9-25pnsFr2wKPoctfMIALGkWno6-4RdEBdKRlp2Q8Qc1Dg2c3uTVizkAlk1Kuk81-r77DnziozNPVgTZMo8SbanShU6MPoVP0PapBIt6YKVvbCMmdquiLC~529z9-E~YwbB0~E3CHQKSeswJqdGjwXgdSZcWAUMZPdtSp6vImmfkAjiLJhrj5KMBrNq7qYfwDmIrIKbsXMCyDVYsu6ce-IXfyLT2fWiFFJXNxgVgS20NSFS23IE0vVIGm~aHl-JBXWXTOVzI60pXYIlno0czoJzOccU0R9idA__"
                alt="clock"
              />
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Page2;
