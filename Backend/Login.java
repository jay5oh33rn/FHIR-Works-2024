import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class Login{

    // Simulate sending HTTP POST request for authentication
    public static void sendPostRequest(String username, String password) {
        try {
            URL url = new URL("192.168.0.1");
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();

            // Set method to POST
            connection.setRequestMethod("POST");
            // Set headers if needed (e.g., content type)
            connection.setRequestProperty("Content-Type", "application/json");

            // Enable input and output streams
            connection.setDoOutput(true);

            // Create the request body
            String requestBody = "{\"username\": \"" + username + "\", \"password\": \"" + password + "\"}";

            // Send request
            DataOutputStream outputStream = new DataOutputStream(connection.getOutputStream());
            outputStream.writeBytes(requestBody);
            outputStream.flush();
            outputStream.close();

            // Get response code to determine success
            int responseCode = connection.getResponseCode();

            if (responseCode == HttpURLConnection.HTTP_OK) { // HTTP 200
                // Read response
                BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                String inputLine;
                StringBuffer response = new StringBuffer();

                while ((inputLine = in.readLine()) != null) {
                    response.append(inputLine);
                }
                in.close();

                // Print result - here you would parse the JSON response to extract data
                System.out.println("Authentication successful: " + response.toString());

                // For demonstration, we'll simulate that the response includes a unique ID and full name
                String userID = "12345";
                String fullName = "John Doe";

                System.out.println("User ID: " + userID + ", Full Name: " + fullName);
            } else {
                System.out.println("Authentication failed");
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        // Example usage
        sendPostRequest("myUsername", "myPassword");
    }
}
