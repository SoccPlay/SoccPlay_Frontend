import "./searchItem.css";

const SearchItem = () => {
    return (
        <div className="searchItem">
            <img
                src="https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1"
                alt=""
                className="siImg"
            />
            <div className="siDesc">
                <h1 className="siTitle">Tên Sân</h1>
                <span className="siDistance">500m from center</span>
                <span className="siTaxiOp">Policty</span>
                <span className="siSubtitle">Những loại sân hiện có</span>
                <span className="siFeatures">Sân 5, Sân 7</span>
                <span className="siCancelOp">Hủy vé miễn phí </span>
                <span className="siCancelOpSubtitle">
                    Bạn có thể hủy vé sau khi đặt, đặt ngay để được giá tốt
                </span>
            </div>
            <div className="siDetails">
                <div className="siRating">
                    <span>Rating points</span>
                    <button>8.9</button>
                </div>
                <div className="siDetailTexts">
                    <span className="siPrice">$112</span>
                    <div class="container">
                        <a href="detail" class="button">
                            <div class="button__line"></div>
                            <div class="button__line"></div>
                            <span class="button__text">Detail</span>
                            <div class="button__drow1"></div>
                            <div class="button__drow2"></div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchItem;
