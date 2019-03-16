function localtunnel {
  lt -s invitationtracker --port 3000
}
until localtunnel; do
echo "localtunnel server crashed"
sleep 2
done