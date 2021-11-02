# Config app environment variable
export APP_PORT=8888
export APP_HOST=localhost

# Config database environment variable
# export DB_CONNECTION="mongodb+srv"
# export DB_HOST=cluster0.ncsf0.mongodb.net
# export DB_PORT=27017
export DB_CONNECTION=mongodb
export DB_HOST=localhost
export DB_PORT=27017
export DB_NAME=Chat_App
export DB_USER=minhchiu
export DB_PASSWORD=Passwordchiu

# config session
export SESSION_KEY=minhchiu
export SESSION_SECRET=minhiu

# Config admin use account
export MAIL_USER=minhch.vn@gmail.com
export MAIL_PASSWORD=Passwordminhch
export MAIL_HOST=smtp.gmail.com
export MAIL_PORT=587

# Config facebook login app
export FB_APP_ID=277996807115725
export FB_APP_SECRET=709d233133a3f97dc28b6f502df6b8ba
export FB_CALLBACK_URL=https://localhost:8018/auth/facebook/callback

# Config facebook login app
export GG_APP_ID=393375672756-14gvtm94jj1r7msio1irmcpj7dtgvhvd.apps.googleusercontent.com
export GG_APP_SECRET=rHHsvWfxoLmS4NqPjwvCdJxe
export GG_CALLBACK_URL=https://localhost:8018/auth/google/callback

# Config jsonwebtoken
export JWT_SECRET=393375672756-14gvtm94jj1r7msio1irmcpj7dtgvhvd.apps.googleusercontent.com