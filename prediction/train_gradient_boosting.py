import pandas as pd
import numpy as np
import joblib

from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

# =========================
# LOAD DATASET
# =========================
df = pd.read_csv("AyamSerayu_3Years_Transaction_Data.csv")
df["Tanggal & Waktu"] = pd.to_datetime(df["Tanggal & Waktu"])

# =========================
# DAILY SALES
# =========================
daily_sales = (
    df.groupby(df["Tanggal & Waktu"].dt.normalize())["Total"]
    .sum()
    .sort_index()
    .asfreq("D")
    .fillna(0)
)

model_df = pd.DataFrame({"sales": daily_sales})

# =========================
# FEATURE ENGINEERING
# =========================
model_df["month"] = model_df.index.month
model_df["day"] = model_df.index.day
model_df["dayofweek"] = model_df.index.dayofweek
model_df["weekofyear"] = model_df.index.isocalendar().week.astype(int)
model_df["quarter"] = model_df.index.quarter

model_df["lag_1"] = model_df["sales"].shift(1)
model_df["lag_7"] = model_df["sales"].shift(7)
model_df["rolling_mean_7"] = model_df["sales"].shift(1).rolling(7).mean()
model_df["rolling_std_7"] = model_df["sales"].shift(1).rolling(7).std()

model_df = model_df.dropna()

# =========================
# TRAIN TEST SPLIT
# =========================
feature_cols = [
    "month",
    "day",
    "dayofweek",
    "weekofyear",
    "quarter",
    "lag_1",
    "lag_7",
    "rolling_mean_7",
    "rolling_std_7"
]

X = model_df[feature_cols]
y = model_df["sales"]

split_index = int(len(model_df) * 0.8)

X_train = X.iloc[:split_index]
X_test = X.iloc[split_index:]
y_train = y.iloc[:split_index]
y_test = y.iloc[split_index:]

# =========================
# TRAIN GRADIENT BOOSTING
# =========================
model = GradientBoostingRegressor(
    n_estimators=250,
    learning_rate=0.05,
    max_depth=3,
    random_state=42
)

model.fit(X_train, y_train)

# =========================
# EVALUATION
# =========================
prediction = model.predict(X_test)
prediction = np.maximum(prediction, 0)

mae = mean_absolute_error(y_test, prediction)
rmse = np.sqrt(mean_squared_error(y_test, prediction))

mape = np.mean(
    np.abs((y_test - prediction) / y_test.replace(0, np.nan))
) * 100

accuracy = 100 - mape
r2 = r2_score(y_test, prediction)

print("=" * 60)
print("GRADIENT BOOSTING MODEL PERFORMANCE")
print("=" * 60)
print(f"MAE       : {mae:,.2f}")
print(f"RMSE      : {rmse:,.2f}")
print(f"MAPE      : {mape:.2f}%")
print(f"Accuracy  : {accuracy:.2f}%")
print(f"R2 Score  : {r2:.3f}")

# =========================
# RETRAIN USING FULL DATA
# =========================
final_model = GradientBoostingRegressor(
    n_estimators=250,
    learning_rate=0.05,
    max_depth=3,
    random_state=42
)

final_model.fit(X, y)

# =========================
# SAVE MODEL
# =========================
joblib.dump(final_model, "sales_forecasting_model.pkl")

latest_values = {
    "last_lag_1": model_df["lag_1"].iloc[-1],
    "last_lag_7": model_df["lag_7"].iloc[-1],
    "rolling_mean_7": model_df["rolling_mean_7"].iloc[-1],
    "rolling_std_7": model_df["rolling_std_7"].iloc[-1]
}

joblib.dump(latest_values, "latest_values.pkl")

print("\nModel saved successfully as sales_forecasting_model.pkl")
print("Latest values saved successfully as latest_values.pkl")

# =========================
# CONFIRM MODEL TYPE
# =========================
loaded_model = joblib.load("sales_forecasting_model.pkl")
print("\nSaved model type:")
print(type(loaded_model))