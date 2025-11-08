-- Create the event table if it doesn't exist
CREATE TABLE IF NOT EXISTS event (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    sil_points INT NOT NULL,
    poster_url VARCHAR(255)
);

-- Insert sample events
INSERT INTO event (title, date, sil_points, poster_url) VALUES
('''Tech Conference 2025''', '''2025-10-26''', 100, '''https://www.creative-tim.com/blog/content/images/size/w960/2022/01/which-development-tool-is-better-for-your-project--.png'''),
('''Design Workshop''', '''2025-11-15''', 75, '''https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT87A_s32n8t3_2GSP_I22ikYp_2h2c3s_A-Q&s'''),
('''Career Fair 2025''', '''2025-12-01''', 50, '''https://news.virginia.edu/sites/default/files/article_image/fall_2022_career_fair_header.jpg''');
