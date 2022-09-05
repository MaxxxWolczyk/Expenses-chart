const bars = document.querySelectorAll(".bar")

const dayLock = (bars) => {
    const date = new Date();
    let day;
    switch (date.getDay()) {
        case 0:
            day = "sun";
            break;
        case 1:
            day = "mon";
            break;
        case 2:
            day = "tue";
            break;
        case 3:
            day = "wed";
            break;
        case 4:
            day = "thu";
            break;
        case 5:
            day = "fri";
            break;
        case 6:
            day = "sat";
    }
    bars.forEach(bar => {
        if (bar.childNodes[5].getAttribute("data-target") === day) {
            bar.childNodes[3].style.background = "hsl(28, 10%, 53%)";
        }
    })
}

const dataFetch = (bar) => {
    fetch("./data.json")
        .then(result => result.json())
        .then(result => result.forEach(res => {
            if (res.day === bar.childNodes[5].textContent) {
                bar.childNodes[1].textContent = `$${res.amount}`;
                let width = res.amount / 921.48 * 100;
                bar.childNodes[3].style.height = `${(200 * (width / 100)) * 7}px`
            }
        }
        ));
}

const barEvent = (bar) => {
    if (((window.innerWidth <= 800) && (window.innerHeight <= 600))) {
        bar.childNodes[3].addEventListener("click", () => {
            bar.childNodes[1].classList.toggle("active");
            bar.childNodes[3].classList.toggle("active");

        })
    } else {
        bar.childNodes[3].addEventListener("mouseenter", () => {
            bar.childNodes[1].classList.add("active");
            bar.childNodes[3].classList.add("active");
        })
        bar.childNodes[3].addEventListener("mouseleave", () => {
            bar.childNodes[1].classList.remove("active");
            bar.childNodes[3].classList.remove("active");
        })
    }
}

const appInit = (bars) => {
    bars.forEach(bar => {
        dataFetch(bar);
        dayLock(bars);
        barEvent(bar)
        setInterval(() => {
            dayLock(bars);
        }, 3600000)
    });
}

appInit(bars);








