# **100 Cloud Problem Scenarios and their Solutions**
<br>

I. **IAM, Organizations, and Resource Hierarchy**

    Problem: A developer needs access to a specific bucket but should not see other resources in the project.

        Solution: Apply an IAM policy at the Resource level (the bucket itself) rather than the project level.

    Problem: You need to ensure all new projects automatically have a security audit team assigned.

        Solution: Assign the IAM roles at the Folder or Organization level so they inherit down to all projects.

    Problem: A user needs to manage GKE clusters but shouldn't be able to delete the project.

        Solution: Assign the container.admin role and avoid the owner or editor roles.

    Problem: You want to prevent a former employee from accessing the console immediately.

        Solution: Disable their account in the Google Workspace/Cloud Identity domain level.

    Problem: A script needs to upload logs to Cloud Storage without using a personal user account.

        Solution: Create a Service Account and assign it the storage.objectCreator role.

    Problem: You need to grant a contractor temporary access to a VM.

     Solution: Use IAM Conditions to set an expiration date on their role.

    Problem: You are confused about why a user can delete a VM even though you removed the role at the project level.

        Solution: Check if the role was granted at the Folder or Org level, as inherited permissions cannot be restricted at a lower level.

    Problem: You need to audit who changed a firewall rule.

        Solution: View the Admin Activity Audit Logs in Cloud Logging.

    Problem: An auditor needs to see all resources but change nothing.

        Solution: Assign the viewer primitive role or specific v2 metadata reader roles.

    Problem: A developer needs to debug an app on their local machine using GCP services.

        Solution: Create a Service Account, download the JSON Key, and set the GOOGLE_APPLICATION_CREDENTIALS environment variable.

II. **Billing and Cost Management**

    Problem: You want to be notified when your monthly spend hits $50.

        Solution: Create a Budget Alert with a threshold set at 100% of $50.

    Problem: Your manager wants a CSV of all costs broken down by department.

        Solution: Enable Billing Export to BigQuery and use labels (e.g., dept:marketing) to filter data.

    Problem: You want to cap costs to exactly $0 for a test project to avoid any charges.

        Solution: Link the project to a Pub/Sub topic triggered by a budget alert to programmatically disable billing or shut down resources.

    Problem: You have two separate companies under one organization and need separate invoices.

        Solution: Create two separate Cloud Billing Accounts within the resource hierarchy.

    Problem: You need to give a finance employee the ability to see bills but not touch VMs.

        Solution: Assign the Billing Account Viewer role.

    Problem: You want to see how much a specific "Pro" project is costing compared to "Dev."

        Solution: Use the Billing Reports filter and group by Project.

    Problem: A project is no longer needed, and you want to stop all charges immediately.

        Solution: Shut down the project (this deletes all resources within it) or unlink it from the Billing Account.

    Problem: You want to receive a 30% discount on a VM you plan to run for 3 years.

        Solution: Purchase a Committed Use Discount (CUD).

    Problem: You noticed a spike in costs and need to know which service caused it.

        Solution: Use the Cost Table in the Billing console to see the SKU-level breakdown.

    Problem: You want to ensure developers don't launch expensive GPU instances.

        Solution: Use Organization Policy Constraints to restrict specific machine types.

III. **Compute Engine (VMs)**

    Problem: You need to run a batch processing job that can be interrupted to save 80% in costs.

        Solution: Use Preemptible VMs (or Spot VMs).

    Problem: A VM is running out of disk space.

        Solution: Edit the Persistent Disk size in the console and then resize the file system in the OS.

    Problem: You need to ensure a web server restarts automatically if the underlying hardware fails.

        Solution: Ensure Availability Policy is set to "On Host Maintenance: Terminate" and "Automatic Restart: On."

    Problem: You want to run a script every time a VM starts up.

        Solution: Add the script to the VM's Startup Script Metadata.

    Problem: You need to log in to a Linux VM but don't want to manage SSH keys manually.

        Solution: Use IAP (Identity-Aware Proxy) or the gcloud compute ssh command which handles keys for you.

    Problem: Your application requires a specific version of a library on every VM.

        Solution: Create a Custom Image from a configured VM.

    Problem: You need to scale your web tier based on CPU usage.

        Solution: Create a Managed Instance Group (MIG) and configure an Autoscaler.

    Problem: You want to distribute traffic across VMs in different regions.

        Solution: Use an HTTP(S) Load Balancer with a Multi-region MIG.

    Problem: A VM needs to access a private API in another VPC.

        Solution: Configure VPC Network Peering.

    Problem: You want to move a VM to a different zone.

        Solution: Use the Move button in the console (which automates snapshots/restores) or manually snapshot the disk and recreate it in the new zone.

IV. **App Engine (PaaS)**

    Problem: You want to deploy code without managing servers, and the app is written in Python.

        Solution: Use App Engine Standard.

    Problem: Your app requires a specific OS-level binary that is not in the Standard runtime.

        Solution: Use App Engine Flexible, which uses Docker containers.

    Problem: You want to test a new version of your app with only 10% of users.

        Solution: Use Traffic Splitting in the App Engine console.

    Problem: You need your app to scale down to zero instances when no one is using it.

        Solution: Use App Engine Standard (Flexible cannot scale to zero).

    Problem: You want to see the logs for your App Engine application.

        Solution: Check Cloud Logging filtered by "GAE Application."

    Problem: Your App Engine app needs to store session data in a NoSQL database.

        Solution: Use Firestore in Datastore mode.

    Problem: You need to map a custom domain (www.myapp.com) to App Engine.

        Solution: Use Custom Domains in App Engine settings and update DNS records.

    Problem: You want to prevent your App Engine app from being accessed by the public internet.

        Solution: Use IAP (Identity-Aware Proxy) to restrict access to specific users.

    Problem: You want to roll back to a previous version of your app because of a bug.

        Solution: Go to the Versions tab and migrate 100% of traffic to the older version.

    Problem: You need to run a background cron job in your application.

        Solution: Define a cron.yaml file in your App Engine project.

V. **Google Kubernetes Engine (GKE)**

    Problem: You want GCP to manage the control plane and the nodes for you.

        Solution: Use GKE Autopilot.

    Problem: You need to scale the number of pods in a deployment based on memory.

        Solution: Use a Horizontal Pod Autoscaler (HPA).

    Problem: You need to scale the number of nodes because pods are pending.

        Solution: Enable the Cluster Autoscaler.

    Problem: You want to ensure your GKE cluster is always running the latest security patches.

        Solution: Enable Node Auto-Upgrades.

    Problem: You need to expose your GKE deployment to the internet.

        Solution: Create a Service of type LoadBalancer.

    Problem: You want to store secrets (API keys) securely in GKE.

        Solution: Use Kubernetes Secrets or Secret Manager integrated with GKE.

    Problem: You want to limit the CPU/Memory a specific namespace can use.

        Solution: Set a Resource Quota.

    Problem: You need to deploy a containerized app that only runs for 5 minutes and then stops.

        Solution: Use a Kubernetes Job.

    Problem: You want to use a specific version of Kubernetes.

        Solution: Specify the version during cluster creation or via the Release Channels.

    Problem: You need to connect to a cluster using kubectl from your laptop.

        Solution: Run gcloud container clusters get-credentials [CLUSTER_NAME].

VI. **Storage and Databases**

    Problem: You need to store millions of small images that are accessed frequently.

        Solution: Use Cloud Storage (Standard Storage class).

    Problem: You need to archive data for 10 years for compliance and rarely touch it.

        Solution: Use Cloud Storage Archive class.

    Problem: You need a relational database (SQL) that handles automatic failover.

        Solution: Use Cloud SQL with High Availability (HA) enabled.

    Problem: You need a globally scalable, strongly consistent relational database.

        Solution: Use Cloud Spanner.

    Problem: You need a NoSQL database for high-speed analytical writes (IoT data).

        Solution: Use Cloud Bigtable.

    Problem: You want to host a static website (HTML/CSS) cheaply.

        Solution: Use a Cloud Storage Bucket configured for static website hosting.

    Problem: You want to move 50TB of data from an on-prem server to GCP.

        Solution: Use the Storage Transfer Service or a Transfer Appliance.

    Problem: You need to share a file system between multiple Compute Engine VMs.

        Solution: Use Filestore.

    Problem: You want to ensure files in a bucket cannot be deleted for 5 years.

        Solution: Set a Bucket Retention Policy.

    Problem: You need to run complex SQL queries on petabytes of data for business intelligence.

        Solution: Use BigQuery.

VII. **Networking**

    Problem: You want to connect your office to GCP with a dedicated physical link.

        Solution: Use Dedicated Interconnect.

    Problem: You need to connect a small branch office to GCP over the internet.

        Solution: Use Cloud VPN.

    Problem: You want to block all traffic to a VM except on port 443.

        Solution: Create a VPC Firewall Rule (Ingress, Allow, port 443, target tags).

    Problem: You need a fixed IP address for a VM that doesn't change on reboot.

        Solution: Reserve a Static External IP address.

    Problem: You want to give VMs without external IPs access to the internet for updates.

        Solution: Use Cloud NAT.

    Problem: You have two VPCs in the same project that need to communicate.

        Solution: Use VPC Network Peering.

    Problem: You want to manage DNS records for your domain inside GCP.

        Solution: Use Cloud DNS.

    Problem: You want to protect your web app from SQL injection and DDoS.

        Solution: Use Google Cloud Armor with an HTTP(S) Load Balancer.

    Problem: You want to reduce latency for users in Europe accessing a US-based bucket.

        Solution: Enable Cloud CDN.

    Problem: You want to use one set of private subnets across multiple GCP projects.

        Solution: Use Shared VPC.

VIII. **Operations Suite (Monitoring & Logging)**

    Problem: You want to see a graph of CPU usage for all your VMs.

        Solution: Use Cloud Monitoring Dashboards.

    Problem: You want to be texted when a VM goes down.

        Solution: Create an Uptime Check and an Alerting Policy with an SMS notification channel.

    Problem: You need to see why an application is slow by looking at request paths.

        Solution: Use Cloud Trace.

    Problem: You need to find a bug in production without stopping the app.

        Solution: Use Cloud Debugger to take a "Snapshot".

    Problem: You want to know which part of your code is consuming the most CPU.

        Solution: Use Cloud Profiler.

    Problem: You need to aggregate all "404 Not Found" errors from your web logs.

        Solution: Create a Logs-based Metric.

    Problem: You want to send logs from GCP to an external SIEM (like Splunk).

        Solution: Create a Log Sink to a Pub/Sub topic.

    Problem: Your application is crashing, and you need to see the stack trace.

        Solution: Use Error Reporting.

    Problem: You want to monitor a VM's disk usage, but the console only shows CPU.

        Solution: Install the Ops Agent (Logging/Monitoring agent) on the VM.

    Problem: You want to see the history of all gcloud commands run in your project.

        Solution: Check Cloud Audit Logs.

IX. **Developer Tools & Deployment**

    Problem: You want to manage your infrastructure using code (IaC).

        Solution: Use Deployment Manager (or Terraform).

    Problem: You need a private place to store Docker images.

        Solution: Use Artifact Registry (or Container Registry).

    Problem: You want to trigger a build whenever you push code to GitHub.

        Solution: Create a Cloud Build Trigger.

    Problem: You need to run a small piece of code in response to a file being uploaded to a bucket.

        Solution: Use Cloud Functions.

    Problem: You want to use a command-line interface in the browser without installing anything.

        Solution: Use Cloud Shell.

    Problem: You need to store sensitive API keys so they aren't in your code.

        Solution: Use Secret Manager.

    Problem: You want to verify that a container image has no known vulnerabilities.

        Solution: Enable Container Analysis / Vulnerability Scanning in Artifact Registry.

    Problem: You want to preview a web app running on Cloud Shell.

        Solution: Use the Web Preview feature on port 8080.

    Problem: You need to use gcloud from your own laptop.

        Solution: Install the Google Cloud SDK.

    Problem: You want to automate the deployment of a multi-tier application.

        Solution: Use a Deployment Manager configuration file (YAML).

X. **Security & Compliance**

    Problem: You want to ensure no one can ever access your VMs from the public internet.

        Solution: Remove external IPs and use IAP (Identity-Aware Proxy) for management.

    Problem: You need to encrypt data in a bucket using your own keys from on-prem.

        Solution: Use Customer-Supplied Encryption Keys (CSEK).

    Problem: You want to manage your encryption keys within GCP.

        Solution: Use Cloud KMS (Key Management Service).

    Problem: You need to scan your public web app for common vulnerabilities like XSS.

        Solution: Use Web Security Scanner.

    Problem: You want to ensure all disks in your project are encrypted.

        Solution: GCP encrypts all data at rest by default; use an Org Policy to enforce specific key types.

    Problem: You need to prove to an auditor that your environment is SOC2 compliant.

        Solution: Download compliance reports from the Compliance Reports Repository.

    Problem: You want to restrict which APIs can be enabled in a project.

        Solution: Use Service Usage Admin roles and Org Policies.

    Problem: You need to protect your account with more than just a password.

        Solution: Enable 2nd-Step Verification (2FA) using Google Prompts or Security Keys.

    Problem: You want to see if any of your buckets are accidentally public.

        Solution: Use the Security Command Center.

    Problem: You want to prevent developers from creating projects outside of your organization.

        Solution: Define the Resource Hierarchy and remove the Project Creator role from the default domain users.

    
