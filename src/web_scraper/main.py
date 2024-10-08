
from scraper_db import ScrapeSpeedCubeDB

def main():
    scraped_data = ScrapeSpeedCubeDB()
    scraped_data.write_data(["F2L", "OLL", "PLL"])
    
if __name__ == "__main__":
    main()